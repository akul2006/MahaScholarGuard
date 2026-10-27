/**
 * MahaScholar Guard - Centralized API Client
 * Manages communication with the FastAPI backend service.
 */

export interface HealthResponse {
  status: string;
  service: string;
  version: string;
}

export type ConnectionState = 'checking' | 'connected' | 'error';

export interface HealthCheckResult {
  state: ConnectionState;
  message: string;
  data?: HealthResponse;
}

export interface BackendDocumentSpec {
  code: string;
  nameEn: string;
  nameMr: string;
  issuingAuthorityEn: string;
  issuingAuthorityMr: string;
  instructionsEn: string;
  instructionsMr: string;
}

export interface BackendValidateRequest {
  schemeId: string;
  documentCodes: string[];
  language?: 'en' | 'mr';
}

export interface BackendValidateResponse {
  schemeId: string;
  schemeNameEn: string;
  schemeNameMr: string;
  rulesetStatus: string;
  warningEn: string;
  warningMr: string;
  requiredDocumentCodes: string[];
  presentDocumentCodes: string[];
  missingDocumentCodes: string[];
  isReady: boolean;
  summaryEn: string;
  summaryMr: string;
  missingDocuments: BackendDocumentSpec[];
  presentDocuments: BackendDocumentSpec[];
  disclaimerEn: string;
  disclaimerMr: string;
}

/**
 * Backend base URL read from VITE_API_BASE_URL, defaulting to http://127.0.0.1:8000.
 * Strips trailing slashes to guarantee clean URL path composition.
 */
export const API_BASE_URL: string = (
  import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'
).replace(/\/+$/, '');

const DEFAULT_TIMEOUT_MS = 6000;

/**
 * Checks backend connectivity via GET /api/health.
 * Handles timeouts, network failures, and external abort signals gracefully.
 */
export async function checkBackendHealth(signal?: AbortSignal): Promise<HealthResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  if (signal) {
    if (signal.aborted) {
      clearTimeout(timeoutId);
      controller.abort();
    } else {
      signal.addEventListener('abort', () => controller.abort(), { once: true });
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/health`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data: HealthResponse = await response.json();

    if (!data || data.status !== 'ok') {
      throw new Error('Unexpected response format from backend health endpoint');
    }

    return data;
  } catch (error: unknown) {
    if (signal?.aborted) {
      throw new DOMException('Request aborted by caller', 'AbortError');
    }

    if (controller.signal.aborted) {
      throw new Error('Connection timed out. Check that the FastAPI server is running.');
    }

    if (error instanceof Error) {
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        throw new Error('Cannot connect. Check that the FastAPI server is running.');
      }
      throw new Error(error.message);
    }

    throw new Error('Cannot connect to backend service.');
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Evaluates document readiness via POST /api/validate on the FastAPI backend rules engine.
 * Privacy guarantee: Only scheme ID and document-type codes are transmitted.
 * No file binaries, personal credentials, or extracted fields are ever sent.
 */
export async function validateDocumentsWithBackend(
  payload: BackendValidateRequest,
  signal?: AbortSignal
): Promise<BackendValidateResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  if (signal) {
    if (signal.aborted) {
      clearTimeout(timeoutId);
      controller.abort();
    } else {
      signal.addEventListener('abort', () => controller.abort(), { once: true });
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      let errorDetail = `HTTP ${response.status}`;
      try {
        const errorJson = await response.json();
        if (errorJson?.detail) {
          errorDetail = typeof errorJson.detail === 'string' ? errorJson.detail : JSON.stringify(errorJson.detail);
        }
      } catch {
        // Fallback to HTTP status
      }
      throw new Error(errorDetail);
    }

    const data: BackendValidateResponse = await response.json();
    return data;
  } catch (error: unknown) {
    if (signal?.aborted) {
      throw new DOMException('Request aborted by caller', 'AbortError');
    }

    if (controller.signal.aborted) {
      throw new Error('Validation request timed out. Verify backend server is running.');
    }

    if (error instanceof Error) {
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        throw new Error('Backend validation unavailable. FastAPI server could not be reached.');
      }
      throw error;
    }

    throw new Error('Unknown error during backend document validation.');
  } finally {
    clearTimeout(timeoutId);
  }
}
