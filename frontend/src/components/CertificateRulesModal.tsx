import React from 'react';

interface CertificateRulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateRulesModal: React.FC<CertificateRulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-[#c5c6ce] flex flex-col max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[#eceef0]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#3755c3] text-[26px]">gavel</span>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-[#000412] font-bold">
                Maharashtra Certificate Standards
              </h3>
              <p className="text-xs text-[#44474d]">
                Official Aaple Sarkar digital signature rules &amp; MahaDBT guidelines
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#75777e] hover:bg-[#eceef0]"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="py-4 space-y-4 text-xs">
          <div className="border border-[#c5c6ce] rounded-xl p-3 bg-[#f2f4f6]">
            <h4 className="font-semibold text-sm text-[#000412] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#3755c3] text-[18px]">verified</span>
              1-Year vs. 3-Year Income Certificate Rules
            </h4>
            <p className="text-[#44474d] mt-1 leading-relaxed">
              For scholarship applications for Academic Year 2024-25, the income certificate must strictly cover the <strong>Preceding Financial Year 2023-24</strong>. If you hold a 3-year certificate issued in 2022, it remains valid until March 31, 2025. Ensure the 16-digit barcode begins with &lsquo;MH-&rsquo; or &lsquo;REV-&rsquo;.
            </p>
          </div>

          <div className="border border-[#c5c6ce] rounded-xl p-3 bg-[#f2f4f6]">
            <h4 className="font-semibold text-sm text-[#000412] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#3755c3] text-[18px]">verified</span>
              Maharashtra Domicile Certificate (वय, अधिवास व राष्ट्रीयत्व)
            </h4>
            <p className="text-[#44474d] mt-1 leading-relaxed">
              Domicile certificates issued by Executive Magistrates / Tahsildars under Form C are legally valid for a lifetime unless explicitly revoked. Colleges do not require re-issuance every year.
            </p>
          </div>

          <div className="border border-[#c5c6ce] rounded-xl p-3 bg-[#f2f4f6]">
            <h4 className="font-semibold text-sm text-[#000412] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#3755c3] text-[18px]">verified</span>
              Caste Certificate vs. Caste Validity Certificate
            </h4>
            <p className="text-[#44474d] mt-1 leading-relaxed">
              For SC/ST and OBC students in professional colleges (Engineering, Pharmacy, Medicine, MBA), a Caste Certificate alone is <strong>not sufficient</strong>. A separate Caste Validity Certificate issued by the Divisional Scrutiny Committee is legally mandatory.
            </p>
          </div>

          <div className="border border-[#c5c6ce] rounded-xl p-3 bg-[#f2f4f6]">
            <h4 className="font-semibold text-sm text-[#000412] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#3755c3] text-[18px]">verified</span>
              MahaDBT File Scan Dimensions &amp; Size Limits
            </h4>
            <p className="text-[#44474d] mt-1 leading-relaxed">
              The MahaDBT portal rejects PDF files smaller than 100 KB (too compressed/illegible) and larger than 256 KB. Documents must be color-scanned at 150-200 DPI with readable barcodes and government round seals.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-[#eceef0] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#0f1e36] text-white text-xs font-semibold hover:bg-[#3755c3]"
            type="button"
          >
            I Understand the Rules
          </button>
        </div>
      </div>
    </div>
  );
};
