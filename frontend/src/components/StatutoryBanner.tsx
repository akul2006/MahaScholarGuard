import React from 'react';
import { Language } from '../types';
import { t } from '../i18n';

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
              {t('independentAdvisory', language)}
            </span>
            <p className="font-body-sm text-body-sm text-[#44474d]">
              {language === 'mr' ? (
                <>
                  महास्कॉलर गार्ड हे महाराष्ट्रातील विद्यार्थ्यांसाठी स्वतंत्र कागदपत्र पूर्वतयारी सहाय्यक साधन आहे. हे{' '}
                  <strong className="text-[#191c1e]">अधिकृत सरकारी पोर्टल (MahaDBT) नाही</strong> आणि ते अर्जांचे मूल्यमापन, मंजुरी अथवा शिष्यवृत्ती वितरणाची हमी देत नाही.
                </>
              ) : (
                <>
                  MahaScholar Guard is an independent document readiness assistant for Maharashtra students. It is{' '}
                  <strong className="text-[#191c1e]">NOT an official government portal (MahaDBT)</strong> and does not evaluate, approve applications, or guarantee scholarship disbursements.
                </>
              )}
            </p>
          </div>
          <a
            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-[#3755c3] font-label-md text-label-md hover:bg-[#eceef0] transition-all shadow-xs border border-[#c5c6ce]/60"
            href="https://mahadbt.maharashtra.gov.in"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span>{t('officialMahaDBT', language)}</span>
            <span className="material-symbols-outlined text-[16px]">north_east</span>
          </a>
        </div>
      </div>
    </div>
  );
};
