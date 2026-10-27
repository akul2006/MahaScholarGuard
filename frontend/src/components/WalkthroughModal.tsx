import React from 'react';
import { Language } from '../types';
import { t } from '../i18n';

interface WalkthroughModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartAudit: () => void;
  language?: Language;
}

export const WalkthroughModal: React.FC<WalkthroughModalProps> = ({
  isOpen,
  onClose,
  onStartAudit,
  language = 'en',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-[#c5c6ce] flex flex-col max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[#eceef0]">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-[#dde1ff] text-[#001453] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">play_circle</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-[#000412] font-bold">
                {t('walkthroughTitle', language)}
              </h3>
              <p className="text-xs text-[#44474d]">
                {t('walkthroughSubtext', language)}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#75777e] hover:bg-[#eceef0] hover:text-[#191c1e] cursor-pointer"
            type="button"
            aria-label={t('close', language)}
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="py-4 space-y-4">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-[#f2f4f6]">
            <span className="w-7 h-7 rounded-full bg-[#0f1e36] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              1
            </span>
            <div>
              <h4 className="font-label-lg text-[#000412] font-semibold">
                {t('walkthroughStep1Title', language)}
              </h4>
              <p className="text-xs text-[#44474d] mt-0.5 leading-relaxed">
                {t('walkthroughStep1Body', language)}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-[#f2f4f6]">
            <span className="w-7 h-7 rounded-full bg-[#0f1e36] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              2
            </span>
            <div>
              <h4 className="font-label-lg text-[#000412] font-semibold">
                {t('walkthroughStep2Title', language)}
              </h4>
              <p className="text-xs text-[#44474d] mt-0.5 leading-relaxed">
                {t('walkthroughStep2Body', language)}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-[#f2f4f6]">
            <span className="w-7 h-7 rounded-full bg-[#0f1e36] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              3
            </span>
            <div>
              <h4 className="font-label-lg text-[#000412] font-semibold">
                {t('walkthroughStep3Title', language)}
              </h4>
              <p className="text-xs text-[#44474d] mt-0.5 leading-relaxed">
                {t('walkthroughStep3Body', language)}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-[#f2f4f6]">
            <span className="w-7 h-7 rounded-full bg-[#0f1e36] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              4
            </span>
            <div>
              <h4 className="font-label-lg text-[#000412] font-semibold">
                {t('walkthroughStep4Title', language)}
              </h4>
              <p className="text-xs text-[#44474d] mt-0.5 leading-relaxed">
                {t('walkthroughStep4Body', language)}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#eceef0] flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#eceef0] text-[#191c1e] text-xs font-semibold hover:bg-[#e6e8ea] cursor-pointer"
            type="button"
          >
            {t('close', language)}
          </button>
          <button
            onClick={() => {
              onClose();
              onStartAudit();
            }}
            className="px-4 py-2 rounded-lg bg-[#0f1e36] text-white text-xs font-semibold hover:bg-[#3755c3] cursor-pointer flex items-center gap-1.5"
            type="button"
          >
            <span>{t('walkthroughStartBtn', language)}</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
