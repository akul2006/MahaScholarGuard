import React from 'react';
import { Language } from '../types';

interface FooterProps {
  language: Language;
  onOpenPrivacyModal?: () => void;
  onOpenSafetyModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onOpenPrivacyModal, onOpenSafetyModal }) => {
  return (
    <footer className="w-full bg-[#f2f4f6] shadow-[0_-1px_6px_rgba(0,0,0,0.03)] mt-auto no-print border-t border-[#e6e8ea]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-8 flex flex-col gap-6">
        {/* Statutory & Advisory Disclaimer Box */}
        <div className="bg-[#e0e3e5]/70 p-4 rounded-xl flex items-start gap-4 border border-[#c5c6ce]/50">
          <span className="material-symbols-outlined text-[#3755c3] text-[24px] mt-0.5 shrink-0">
            shield_with_heart
          </span>
          <div className="flex flex-col gap-1">
            <span className="font-label-lg text-label-lg text-[#191c1e] font-semibold">
              {language === 'mr' ? 'वैधानिक व सल्लागार अस्वीकरण' : 'Statutory & Advisory Disclaimer'}
            </span>
            <p className="font-body-sm text-body-sm text-[#44474d] leading-relaxed">
              {language === 'mr'
                ? 'महास्कॉलर गार्ड हे स्वतंत्र पूर्वतयारी सहाय्यक साधन आहे. याचा महाडीबीटी (MahaDBT) किंवा महाराष्ट्र शासनाच्या कोणत्याही विभागाशी थेट संबंध किंवा संलग्नता नाही. हे साधन शिष्यवृत्ती मंजूर करत नाही अथवा अनुदानाची हमी देत नाही. mahadbt.maharashtra.gov.in वर अंतिम अर्ज करण्यापूर्वी कागदपत्रांतील त्रुटी तपासण्यासाठी हे साधन वापरले जाते.'
                : 'MahaScholar Guard is an independent preparation assistant, not affiliated with or endorsed by MahaDBT or any government department. Does not grant approvals or guarantee scholarships. All status ratings denote personal readiness heuristics prior to official submission on mahadbt.maharashtra.gov.in.'}
            </p>
          </div>
        </div>

        {/* Footer Meta & Directives Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 font-body-sm text-body-sm text-[#44474d]">
          <div className="flex items-center gap-3">
            <span className="font-label-md text-label-md text-[#191c1e] font-semibold">
              © 2025 MahaScholar Guard
            </span>
            <span>•</span>
            <span>Pune University Guidance Chapter</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs">
            <button
              onClick={onOpenPrivacyModal}
              className="hover:text-[#191c1e] transition-colors underline-offset-4 hover:underline text-[#44474d]"
              type="button"
            >
              Privacy Directive
            </button>
            <button
              onClick={onOpenSafetyModal}
              className="hover:text-[#191c1e] transition-colors underline-offset-4 hover:underline text-[#44474d]"
              type="button"
            >
              Document Safety Standard
            </button>
            <a
              href="https://mahadbt.maharashtra.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#3755c3] transition-colors font-semibold flex items-center gap-1"
            >
              <span>MahaDBT Official Portal Link</span>
              <span className="material-symbols-outlined text-[14px]">north_east</span>
            </a>
            <span className="text-[#75777e]">Support Desk: support@mahascholarguard.org</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
