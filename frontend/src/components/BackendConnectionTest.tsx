import React, { useEffect, useState, useCallback } from 'react';
import { checkBackendHealth, API_BASE_URL, ConnectionState } from '../services/apiClient';

interface BackendConnectionTestProps {
  className?: string;
}

export default function BackendConnectionTest({ className = '' }: BackendConnectionTestProps) {
  const [state, setState] = useState<ConnectionState>('checking');
  const [message, setMessage] = useState<string>('Connecting to backend...');
  const [serviceDetails, setServiceDetails] = useState<{ service: string; version: string } | null>(null);

  const performCheck = useCallback(async (signal?: AbortSignal) => {
    setState('checking');
    setMessage(`Connecting to backend service...`);
    setServiceDetails(null);

    try {
      const data = await checkBackendHealth(signal);
      setState('connected');
      setMessage(`${data.service} v${data.version} is active`);
      setServiceDetails({ service: data.service, version: data.version });
    } catch (err: unknown) {
      if (signal?.aborted) return;
      setState('error');
      const errText = err instanceof Error ? err.message : 'Cannot connect to backend.';
      setMessage(errText);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    performCheck(controller.signal);
    return () => {
      controller.abort();
    };
  }, [performCheck]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`bg-white rounded-xl p-5 shadow-sm border border-[#e6e8ea] transition-all ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#3755c3] text-[20px]">
            lan
          </span>
          <h3 className="font-headline-sm text-headline-sm text-[#000412] font-bold text-sm">
            Backend API Health
          </h3>
        </div>

        {state === 'checking' && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#dde1ff] text-[#001453]">
            <span className="w-2 h-2 rounded-full bg-[#3755c3] animate-pulse"></span>
            Checking
          </span>
        )}

        {state === 'connected' && (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#89f5e7]/30 text-[#13968a]">
            <span className="material-symbols-outlined text-[14px]">check_circle</span>
            Connected
          </span>
        )}

        {state === 'error' && (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ffdad6]/60 text-[#ba1a1a]">
            <span className="material-symbols-outlined text-[14px]">cloud_off</span>
            Offline
          </span>
        )}
      </div>

      <div className="p-3 rounded-lg bg-[#f2f4f6] border border-[#e6e8ea] text-xs">
        <div className="flex items-center justify-between text-[#44474d] mb-1">
          <span className="font-medium">Target URL:</span>
          <span className="font-mono text-[11px] text-[#000412] font-semibold">{API_BASE_URL}</span>
        </div>

        <div className="flex items-start justify-between gap-2 mt-2 pt-2 border-t border-[#e6e8ea]">
          <div className="flex flex-col">
            <span className="font-medium text-[#191c1e]">Status Description:</span>
            <span
              className={`mt-0.5 ${
                state === 'connected'
                  ? 'text-[#13968a] font-semibold'
                  : state === 'error'
                  ? 'text-[#ba1a1a]'
                  : 'text-[#44474d]'
              }`}
            >
              {message}
            </span>
            {serviceDetails && (
              <span className="text-[11px] text-[#44474d] mt-0.5">
                Service: <code className="font-mono">{serviceDetails.service}</code> • Version:{' '}
                <code className="font-mono">{serviceDetails.version}</code>
              </span>
            )}
          </div>

          {state === 'error' && (
            <button
              onClick={() => performCheck()}
              type="button"
              className="px-2.5 py-1 rounded bg-white border border-[#c5c6ce] hover:bg-[#eceef0] text-[#191c1e] text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer shrink-0"
              title="Retry connection check"
            >
              <span className="material-symbols-outlined text-[14px]">refresh</span>
              Retry
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
