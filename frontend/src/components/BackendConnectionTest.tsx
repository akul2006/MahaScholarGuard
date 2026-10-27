import React, { useEffect, useState, useCallback } from 'react';
import { checkBackendHealth, API_BASE_URL, ConnectionState } from '../services/apiClient';
import { Language } from '../types';
import { t } from '../i18n';

interface BackendConnectionTestProps {
  className?: string;
  language?: Language;
}

export default function BackendConnectionTest({
  className = '',
  language = 'en',
}: BackendConnectionTestProps) {
  const [state, setState] = useState<ConnectionState>('checking');
  const [message, setMessage] = useState<string>('');
  const [serviceDetails, setServiceDetails] = useState<{ service: string; version: string } | null>(null);

  const performCheck = useCallback(async (signal?: AbortSignal) => {
    setState('checking');
    setMessage(t('backendConnecting', language));
    setServiceDetails(null);

    try {
      const data = await checkBackendHealth(signal);
      setState('connected');
      setMessage(`${data.service} v${data.version} ${t('backendActive', language)}`);
      setServiceDetails({ service: data.service, version: data.version });
    } catch (err: unknown) {
      if (signal?.aborted) return;
      setState('error');
      const errText = err instanceof Error ? err.message : t('backendCannotConnect', language);
      setMessage(errText);
    }
  }, [language]);

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
            {t('backendAPIHealth', language)}
          </h3>
        </div>

        {state === 'checking' && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#dde1ff] text-[#001453]">
            <span className="w-2 h-2 rounded-full bg-[#3755c3] animate-pulse"></span>
            {t('checking', language)}
          </span>
        )}

        {state === 'connected' && (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#89f5e7]/30 text-[#13968a]">
            <span className="material-symbols-outlined text-[14px]">check_circle</span>
            {t('connected', language)}
          </span>
        )}

        {state === 'error' && (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ffdad6]/60 text-[#ba1a1a]">
            <span className="material-symbols-outlined text-[14px]">cloud_off</span>
            {t('offline', language)}
          </span>
        )}
      </div>

      <div className="p-3 rounded-lg bg-[#f2f4f6] border border-[#e6e8ea] text-xs">
        <div className="flex items-center justify-between text-[#44474d] mb-1">
          <span className="font-medium">{t('backendTargetURL', language)}</span>
          <span className="font-mono text-[11px] text-[#000412] font-semibold">{API_BASE_URL}</span>
        </div>

        <div className="flex items-start justify-between gap-2 mt-2 pt-2 border-t border-[#e6e8ea]">
          <div className="flex flex-col">
            <span className="font-medium text-[#191c1e]">{t('backendStatusLabel', language)}</span>
            <span
              className={`mt-0.5 ${
                state === 'connected'
                  ? 'text-[#13968a] font-semibold'
                  : state === 'error'
                  ? 'text-[#ba1a1a]'
                  : 'text-[#44474d]'
              }`}
            >
              {message || (state === 'connected' ? t('connected', language) : t('backendConnecting', language))}
            </span>
            {serviceDetails && (
              <span className="text-[11px] text-[#44474d] mt-0.5">
                {t('backendService', language)} <code className="font-mono">{serviceDetails.service}</code> • {t('backendVersion', language)}{' '}
                <code className="font-mono">{serviceDetails.version}</code>
              </span>
            )}
          </div>

          {state === 'error' && (
            <button
              onClick={() => performCheck()}
              type="button"
              className="px-2.5 py-1 rounded bg-white border border-[#c5c6ce] hover:bg-[#eceef0] text-[#191c1e] text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer shrink-0"
              title={t('retry', language)}
            >
              <span className="material-symbols-outlined text-[14px]">refresh</span>
              {t('retry', language)}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
