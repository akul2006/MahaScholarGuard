import React from 'react';
import { Language } from '../types';

interface StatutoryBannerProps {
  language: Language;
}

export const StatutoryBanner: React.FC<StatutoryBannerProps> = ({ language }) => {
  return (
    <div className="w-full bg-[#e6e8ea] rounded-xl p-4 shadow-sm mb-6 border border-[#c5c6ce]/60">
      <div className="flex items-start md:items-center gap-4">
        <div className="w-8 h-8 rounded-full bg-[#3755c3] flex items-center justify-center shrink-0 text-white">
          <span className="material-symbols-outlined text-[18px]">verified_user</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-2">
          <div className="flex flex-col">
            <span className="font-label-md text-label-md text-[#191c1e] uppercase tracking-wider font-semibold">
              {language === 'mr' ? 'स्वतंत्र नागरिक सल्लागार साधन' : 'Independent Citizen Advisory Tool'}
            </span>
            <p className="font-body-sm text-body-sm text-[#44474d]">
              MahaScholar Guard is an independent document readiness assistant for Maharashtra students. It is{' '}
              <strong className="text-[#191c1e]">NOT an official government portal (MahaDBT)</strong> and does not evaluate, approve applications, or guarantee scholarship disbursements.
            </p>
          </div>
          <a
            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-[#3755c3] font-label-md text-label-md hover:bg-[#eceef0] transition-all shadow-xs border border-[#c5c6ce]/60"
            href="https://mahadbt.maharashtra.gov.in"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span>Official MahaDBT</span>
            <span className="material-symbols-outlined text-[16px]">north_east</span>
          </a>
        </div>
      </div>
    </div>
  );
};
