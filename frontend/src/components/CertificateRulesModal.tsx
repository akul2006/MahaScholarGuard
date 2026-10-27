import React from 'react';
import { Language } from '../types';
import { t } from '../i18n';

interface CertificateRulesModalProps {
  isOpen: boolean;
  onClose: () => void;
  language?: Language;
}

export const CertificateRulesModal: React.FC<CertificateRulesModalProps> = ({
  isOpen,
  onClose,
  language = 'en',
}) => {
  if (!isOpen) return null;

  const isMr = language === 'mr';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-[#c5c6ce] flex flex-col max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[#eceef0]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#3755c3] text-[26px]">gavel</span>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-[#000412] font-bold">
                {isMr ? 'महाराष्ट्र प्रमाणपत्र निकष व नियम' : 'Maharashtra Certificate Standards'}
              </h3>
              <p className="text-xs text-[#44474d]">
                {isMr
                  ? 'अधिकृत आपले सरकार डिजिटल स्वाक्षरी नियम आणि MahaDBT मार्गदर्शक तत्त्वे'
                  : 'Official Aaple Sarkar digital signature rules & MahaDBT guidelines'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#75777e] hover:bg-[#eceef0] cursor-pointer"
            type="button"
            aria-label={t('close', language)}
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="py-4 space-y-4 text-xs">
          <div className="border border-[#c5c6ce] rounded-xl p-3 bg-[#f2f4f6]">
            <h4 className="font-semibold text-sm text-[#000412] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#3755c3] text-[18px]">verified</span>
              {isMr ? '१-वर्षीय वि. ३-वर्षीय उत्पन्न दाखला नियम' : '1-Year vs. 3-Year Income Certificate Rules'}
            </h4>
            <p className="text-[#44474d] mt-1 leading-relaxed">
              {isMr
                ? 'शैक्षणिक वर्ष २०२४-२५ च्या शिष्यवृत्ती अर्जांसाठी, उत्पन्नाचा दाखला काटेकोरपणे मागील आर्थिक वर्ष २०२३-२४ चा असणे आवश्यक आहे. २०२२ मध्ये जारी केलेला ३ वर्षांचा दाखला ३१ मार्च २०२५ पर्यंत वैध राहतो. १६ अंकी बारकोड ‘MH-’ किंवा ‘REV-’ ने सुरू होत असल्याची खात्री करा.'
                : 'For scholarship applications for Academic Year 2024-25, the income certificate must strictly cover the Preceding Financial Year 2023-24. If you hold a 3-year certificate issued in 2022, it remains valid until March 31, 2025. Ensure the 16-digit barcode begins with ‘MH-’ or ‘REV-’.'}
            </p>
          </div>

          <div className="border border-[#c5c6ce] rounded-xl p-3 bg-[#f2f4f6]">
            <h4 className="font-semibold text-sm text-[#000412] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#3755c3] text-[18px]">verified</span>
              {isMr ? 'महाराष्ट्र अधिवास प्रमाणपत्र (वय, अधिवास व राष्ट्रीयत्व)' : 'Maharashtra Domicile Certificate (वय, अधिवास व राष्ट्रीयत्व)'}
            </h4>
            <p className="text-[#44474d] mt-1 leading-relaxed">
              {isMr
                ? 'कार्यकारी दंडाधिकारी / तहसीलदार यांच्याकडून फॉर्म C अंतर्गत जारी केलेले अधिवास प्रमाणपत्र जोपर्यंत रद्द केले जात नाही तोपर्यंत आयुष्यभरासाठी कायदेशीररित्या वैध असते. महाविद्यालयांना दरवर्षी नवीन दाखल्याची आवश्यकता नसते.'
                : 'Domicile certificates issued by Executive Magistrates / Tahsildars under Form C are legally valid for a lifetime unless explicitly revoked. Colleges do not require re-issuance every year.'}
            </p>
          </div>

          <div className="border border-[#c5c6ce] rounded-xl p-3 bg-[#f2f4f6]">
            <h4 className="font-semibold text-sm text-[#000412] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#3755c3] text-[18px]">verified</span>
              {isMr ? 'जात प्रमाणपत्र वि. जात वैधता प्रमाणपत्र' : 'Caste Certificate vs. Caste Validity Certificate'}
            </h4>
            <p className="text-[#44474d] mt-1 leading-relaxed">
              {isMr
                ? 'व्यावसायिक महाविद्यालयांमधील (अभियांत्रिकी, फार्मसी, वैद्यकीय, एमबीए) अनुसूचित जाती/जमाती आणि ओबीसी विद्यार्थ्यांसाठी केवळ जात प्रमाणपत्र पुरेसे नाही. विभागीय जात पडताळणी समितीने दिलेले जात वैधता प्रमाणपत्र कायदेशीररित्या अनिवार्य आहे.'
                : 'For SC/ST and OBC students in professional colleges (Engineering, Pharmacy, Medicine, MBA), a Caste Certificate alone is not sufficient. A separate Caste Validity Certificate issued by the Divisional Scrutiny Committee is legally mandatory.'}
            </p>
          </div>

          <div className="border border-[#c5c6ce] rounded-xl p-3 bg-[#f2f4f6]">
            <h4 className="font-semibold text-sm text-[#000412] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#3755c3] text-[18px]">verified</span>
              {isMr ? 'MahaDBT फाइल स्कॅन आकार व मर्यादा' : 'MahaDBT File Scan Dimensions & Size Limits'}
            </h4>
            <p className="text-[#44474d] mt-1 leading-relaxed">
              {isMr
                ? 'MahaDBT पोर्टल १०० KB पेक्षा लहान (अस्पष्ट/जास्त संकुचित) आणि २५६ KB पेक्षा मोठ्या PDF फाइल्स नाकारते. कागदपत्रे १५०-२०० DPI वर रंगीत स्कॅन केलेली असावीत, ज्यात बारकोड आणि शासकीय गोल शिक्के स्पष्ट वाचता आले पाहिजेत.'
                : 'The MahaDBT portal rejects PDF files smaller than 100 KB (too compressed/illegible) and larger than 256 KB. Documents must be color-scanned at 150-200 DPI with readable barcodes and government round seals.'}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-[#eceef0] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#0f1e36] text-white text-xs font-semibold hover:bg-[#3755c3] cursor-pointer"
            type="button"
          >
            {isMr ? 'मला नियम समजले' : 'I Understand the Rules'}
          </button>
        </div>
      </div>
    </div>
  );
};
