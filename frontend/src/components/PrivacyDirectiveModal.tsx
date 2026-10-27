import React from 'react';
import { Language } from '../types';
import { t } from '../i18n';

interface PrivacyDirectiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  language?: Language;
}

export const PrivacyDirectiveModal: React.FC<PrivacyDirectiveModalProps> = ({
  isOpen,
  onClose,
  title,
  language = 'en',
}) => {
  if (!isOpen) return null;

  const isMr = language === 'mr';

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
            className="p-1 rounded-lg text-[#75777e] hover:bg-[#eceef0] cursor-pointer"
            type="button"
            aria-label={t('close', language)}
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="py-4 space-y-3 text-xs text-[#44474d] leading-relaxed">
          <p>
            <strong className="text-[#000412]">{isMr ? 'शून्य सर्व्हर संचयन (Zero Server Retention):' : 'Zero Server Retention:'}</strong>{' '}
            {isMr
              ? 'महास्कॉलर गार्ड केवळ तात्पुरत्या ब्राउझर मेमरीमध्ये (ArrayBuffer/Blob) हेयुरिस्टिक तपासणी करण्यासाठी तयार केले आहे. कोणतीही प्रमाणपत्रे, फोटो किंवा काढलेले माहिती कोष्टक क्लाउड स्टोरेजमध्ये पाठवले वा साठवले जात नाहीत.'
              : 'MahaScholar Guard is architected to perform heuristic schema audits purely inside temporary browser memory (ArrayBuffer/Blob). No certificates, photos, or extracted demographic tables are transmitted or persisted to cloud storage.'}
          </p>
          <p>
            <strong className="text-[#000412]">{isMr ? 'मुखवटा घातलेला आधार प्रोटोकॉल (Masked Aadhaar):' : 'Masked Aadhaar Protocol:'}</strong>{' '}
            {isMr
              ? 'UIDAI नियम आणि आधार कायद्याचे पालन करून सर्व आधार संदर्भ मुखवटा घातलेले असतात (केवळ शेवटचे ४ अंक दिसतात). आम्ही संपूर्ण बायोमेट्रिक किंवा UID क्रमांक साठवत नाही वा पाठवत नाही.'
              : 'In compliance with UIDAI regulations and the Aadhaar Act, all Aadhaar references are masked (displaying only the last 4 digits). We do not store or transmit full biometric or UID numbers.'}
          </p>
          <p>
            <strong className="text-[#000412]">{isMr ? 'स्थितीहीन स्वतंत्र सत्र (Stateless Session):' : 'Stateless Isolated Session:'}</strong>{' '}
            {isMr
              ? 'जेव्हा तुम्ही ब्राउझर रीफ्रेश करता, इतर पृष्ठावर जाता किंवा टॅब बंद करता, तेव्हा सर्व तात्पुरते दस्तऐवज स्थानिक मेमरीमधून त्वरित व कायमचे नष्ट होतात.'
              : 'When you refresh the browser, navigate away, or close your tab, all temporary document blobs are purged automatically from local memory.'}
          </p>
        </div>

        <div className="pt-4 border-t border-[#eceef0] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#0f1e36] text-white text-xs font-semibold hover:bg-[#3755c3] cursor-pointer"
            type="button"
          >
            {isMr ? 'समजले / स्वीकारा' : 'Acknowledge'}
          </button>
        </div>
      </div>
    </div>
  );
};
