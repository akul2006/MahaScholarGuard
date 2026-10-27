import React, { useState } from 'react';
import { ScreenId, Language } from '../types';
import { t } from '../i18n';

interface HeaderProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  language: Language;
  onToggleLanguage: () => void;
  notificationCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  language,
  onToggleLanguage,
  notificationCount = 2,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const navItems: { id: ScreenId; labelKey: string }[] = [
    { id: 'home', labelKey: 'navHome' },
    { id: 'dashboard', labelKey: 'navDashboard' },
    { id: 'scheme-selection', labelKey: 'navSchemeSelection' },
    { id: 'upload-wizard', labelKey: 'navUploadWizard' },
    { id: 'document-review', labelKey: 'navDocumentReview' },
    { id: 'readiness-report', labelKey: 'navReadinessReport' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#ffffff]/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] no-print">
      {/* Top Advisory Utility Strip */}
      <div className="bg-[#f2f4f6] px-4 md:px-8 py-1 border-b border-[#e6e8ea]">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between text-[#44474d]">
          <div className="flex items-center gap-1.5 text-xs truncate">
            <span className="material-symbols-outlined text-[16px] text-[#3755c3] shrink-0">verified_user</span>
            <span className="truncate">
              {t('advisoryStrip', language)}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-xs shrink-0">
            <span className="text-[#44474d]">
              {t('citizenHelpline', language)}
            </span>
            <span className="h-3 w-px bg-[#c5c6ce]"></span>
            <span className="text-[#3755c3] font-semibold">{t('sppuIntake', language)}</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="h-20 max-w-[1280px] mx-auto px-4 md:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div
          className="flex items-center gap-3 cursor-pointer shrink-0 select-none"
          onClick={() => onNavigate('home')}
        >
          <div className="w-10 h-10 rounded-lg bg-[#0f1e36] flex items-center justify-center text-white shadow-sm">
            <span className="material-symbols-outlined text-[24px] text-[#708cfd]">policy</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-headline-sm text-headline-sm text-[#000412] tracking-tight font-bold">
                {t('appName', language)}
              </span>
              <span className="bg-[#e6e8ea] text-[#44474d] text-[11px] px-1.5 py-0.5 rounded font-medium">
                {t('betaBadge', language)}
              </span>
            </div>
            <span className="text-[11px] text-[#44474d] leading-none">
              {t('appTagline', language)}
            </span>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden xl:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#0f1e36] text-white shadow-sm font-bold'
                    : 'text-[#44474d] hover:bg-[#e6e8ea] hover:text-[#191c1e]'
                }`}
              >
                {t(item.labelKey, language)}
              </button>
            );
          })}
        </nav>

        {/* Actions & Profile */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Language Switcher */}
          <button
            onClick={onToggleLanguage}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#eceef0] text-[#191c1e] hover:bg-[#e6e8ea] transition-colors text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#3755c3]"
            title={language === 'mr' ? 'Switch to English' : 'मराठीमध्ये बदला'}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px] text-[#3755c3]">translate</span>
            <span className="font-semibold">{language === 'mr' ? 'मराठी (MR)' : 'English (EN)'}</span>
          </button>

          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg text-[#44474d] hover:bg-[#e6e8ea] hover:text-[#191c1e] transition-colors focus:outline-none focus:ring-2 focus:ring-[#3755c3]"
              aria-label={t('notifications', language)}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              {notificationCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
              )}
            </button>

            {/* Notification Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-[#c5c6ce] p-3 z-50 text-xs">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#eceef0]">
                  <span className="font-semibold text-[#191c1e]">{t('notifications', language)}</span>
                  <span className="text-[10px] bg-[#dde1ff] text-[#001453] px-1.5 py-0.5 rounded">
                    {t('notificationsNew', language)}
                  </span>
                </div>
                <div className="space-y-2">
                  <div
                    onClick={() => {
                      onNavigate('readiness-report');
                      setShowNotifications(false);
                    }}
                    className="p-2 rounded-lg bg-[#ffdad6]/40 hover:bg-[#ffdad6]/60 cursor-pointer transition-colors"
                  >
                    <div className="font-semibold text-[#ba1a1a]">{t('notifIncomeTitle', language)}</div>
                    <div className="text-[11px] text-[#44474d]">{t('notifIncomeBody', language)}</div>
                  </div>
                  <div
                    onClick={() => {
                      onNavigate('document-review');
                      setShowNotifications(false);
                    }}
                    className="p-2 rounded-lg bg-[#dde1ff]/40 hover:bg-[#dde1ff]/60 cursor-pointer transition-colors"
                  >
                    <div className="font-semibold text-[#173bab]">{t('notifNameTitle', language)}</div>
                    <div className="text-[11px] text-[#44474d]">{t('notifNameBody', language)}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Student Profile Pill */}
          <div
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2 pl-1 py-1 rounded-lg cursor-pointer hover:bg-[#eceef0] transition-colors"
            title={t('studentProfileTooltip', language)}
          >
            <div className="w-8 h-8 rounded-full bg-[#3755c3] text-white flex items-center justify-center font-bold text-xs">
              AD
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-semibold text-[#191c1e] leading-tight">
                {language === 'mr' ? 'आरव देशमुख (SPPU पुणे)' : 'Aarav Deshmukh (SPPU Pune)'}
              </span>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#13968a]"></span>
                <span className="text-[11px] text-[#44474d]">{t('studentDegree', language)}</span>
              </div>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-[#44474d] hover:bg-[#e6e8ea]"
            aria-label={t('toggleMenu', language)}
            type="button"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-[#c5c6ce] px-4 py-3 shadow-lg">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#0f1e36] text-white'
                      : 'text-[#44474d] hover:bg-[#eceef0]'
                  }`}
                >
                  {t(item.labelKey, language)}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
