import React from 'react';

interface PrivacyDirectiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export const PrivacyDirectiveModal: React.FC<PrivacyDirectiveModalProps> = ({
  isOpen,
  onClose,
  title,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#c5c6ce] flex flex-col">
        <div className="flex items-center justify-between pb-4 border-b border-[#eceef0]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#13968a] text-[22px]">security</span>
            <h3 className="font-headline-sm text-headline-sm text-[#000412] font-bold text-base">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#75777e] hover:bg-[#eceef0]"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="py-4 space-y-3 text-xs text-[#44474d] leading-relaxed">
          <p>
            <strong>Zero Server Retention:</strong> MahaScholar Guard is architected to perform heuristic schema audits purely inside temporary browser memory (ArrayBuffer/Blob). No certificates, photos, or extracted demographic tables are transmitted or persisted to cloud storage.
          </p>
          <p>
            <strong>Masked Aadhaar Protocol:</strong> In compliance with UIDAI regulations and the Aadhaar Act, all Aadhaar references are masked (displaying only the last 4 digits). We do not store or transmit full biometric or UID numbers.
          </p>
          <p>
            <strong>Stateless Isolated Session:</strong> When you refresh the browser, navigate away, or close your tab, all temporary document blobs are purged automatically from local memory.
          </p>
        </div>

        <div className="pt-4 border-t border-[#eceef0] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#0f1e36] text-white text-xs font-semibold hover:bg-[#3755c3]"
            type="button"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
};
