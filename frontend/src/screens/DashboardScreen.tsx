import React from 'react';
import { StatutoryBanner } from '../components/StatutoryBanner';
import BackendConnectionTest from '../components/BackendConnectionTest';
import { ScreenId, Language, AuditReportData } from '../types';
import { t } from '../i18n';
import { MOCK_SCHEMES } from '../services/scholarshipService';

interface DashboardScreenProps {
  onNavigate: (screen: ScreenId) => void;
  language: Language;
  reportData: AuditReportData;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  onNavigate,
  language,
  reportData,
}) => {
  const currentScheme = MOCK_SCHEMES.find((s) => s.id === reportData.schemeId);
  const schemeName = language === 'mr' ? (currentScheme?.nameMr || reportData.schemeNameEn) : reportData.schemeNameEn;
  const deptName = language === 'mr' ? (currentScheme?.departmentMr || reportData.departmentNameEn) : reportData.departmentNameEn;

  return (
    <div className="flex flex-col w-full">
      {/* Regulatory Banner */}
      <StatutoryBanner language={language} />

      {/* Welcome Banner */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e6e8ea] mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#0f1e36] text-white flex items-center justify-center font-bold text-xl shadow-md">
            AD
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-headline-md text-headline-md text-[#000412] font-bold">
                {language === 'mr' ? 'आरव सुरेश देशमुख' : 'Aarav Suresh Deshmukh'}
              </h1>
              <span className="bg-[#dde1ff] text-[#001453] text-xs font-semibold px-2 py-0.5 rounded-full">
                {t('studentDegree', language)}
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-[#44474d] mt-0.5">
              {language === 'mr'
                ? 'अभियांत्रिकी महाविद्यालय पुणे (COEP Tech) • SPPU प्रवेश वर्ष २०२४–२५'
                : 'College of Engineering Pune (COEP) Tech • SPPU Intake 2024–25'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => onNavigate('upload-wizard')}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#0f1e36] text-white text-xs font-semibold hover:bg-[#3755c3] transition-colors shadow-sm cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>{t('dashboardStartNew', language)}</span>
          </button>
          <button
            onClick={() => onNavigate('scheme-selection')}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#eceef0] text-[#191c1e] text-xs font-semibold hover:bg-[#e6e8ea] transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">list_alt</span>
            <span>{t('dashboardViewSchemes', language)}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Active Check + Calendar Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Left Column: Active Audit Dossier */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e6e8ea]">
            <div className="flex items-center justify-between pb-4 border-b border-[#eceef0]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3755c3] animate-pulse"></span>
                <h2 className="font-headline-sm text-headline-sm text-[#000412] font-bold">
                  {t('dashboardActiveDossier', language)}
                </h2>
              </div>
              <span className="text-xs font-mono bg-[#eceef0] text-[#44474d] px-2.5 py-1 rounded">
                #{reportData.prepId}
              </span>
            </div>

            <div className="py-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#f2f4f6] p-4 rounded-xl border border-[#e6e8ea] mb-4">
                <div className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-wider text-[#3755c3] font-semibold">
                    {t('dashboardTargetScheme', language)}
                  </span>
                  <span className="font-label-lg text-label-lg text-[#000412] font-bold">
                    {schemeName}
                  </span>
                  <span className="text-xs text-[#44474d]">
                    {deptName}
                  </span>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="relative w-14 h-14 flex items-center justify-center">
                    <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-[#e6e8ea]"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                      />
                      <path
                        className="text-[#3755c3]"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeDasharray={`${reportData.overallReadiness}, 100`}
                        strokeLinecap="round"
                        strokeWidth="3.5"
                      />
                    </svg>
                    <span className="absolute text-xs font-bold text-[#3755c3]">
                      {reportData.overallReadiness}%
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-[#000412]">{t('dashboardReadinessGrade', language)}</span>
                    <span className="text-[11px] text-[#3755c3] font-medium">{t('dashboardNeedsAttention', language)}</span>
                  </div>
                </div>
              </div>

              {/* Status Breakdown Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                <div className="bg-[#89f5e7]/20 border border-[#89f5e7] p-3 rounded-lg flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#13968a] text-[22px]">verified</span>
                  <div>
                    <span className="text-xs text-[#44474d] block">{t('dashboardVerifiedReady', language)}</span>
                    <span className="font-bold text-[#13968a] text-sm">
                      {reportData.verifiedCount} {t('dashboardDocuments', language)}
                    </span>
                  </div>
                </div>

                <div className="bg-[#dde1ff]/40 border border-[#dde1ff] p-3 rounded-lg flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#173bab] text-[22px]">warning</span>
                  <div>
                    <span className="text-xs text-[#44474d] block">{t('dashboardFlaggedReview', language)}</span>
                    <span className="font-bold text-[#173bab] text-sm">
                      {reportData.reviewCount} {t('dashboardItems', language)}
                    </span>
                  </div>
                </div>

                <div className="bg-[#ffdad6]/40 border border-[#ffdad6] p-3 rounded-lg flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#ba1a1a] text-[22px]">error</span>
                  <div>
                    <span className="text-xs text-[#44474d] block">{t('dashboardMissingRequired', language)}</span>
                    <span className="font-bold text-[#ba1a1a] text-sm">
                      {reportData.missingCount} {t('dashboardDocument', language)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <span className="text-xs text-[#44474d]">
                  {t('dashboardLastAudited', language)} {reportData.generatedDate}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigate('document-review')}
                    className="px-3 py-1.5 rounded-lg bg-[#eceef0] text-[#191c1e] text-xs font-semibold hover:bg-[#e6e8ea] cursor-pointer"
                    type="button"
                  >
                    {t('dashboardReviewData', language)}
                  </button>
                  <button
                    onClick={() => onNavigate('readiness-report')}
                    className="px-4 py-1.5 rounded-lg bg-[#0f1e36] text-white text-xs font-semibold hover:bg-[#3755c3] flex items-center gap-1 cursor-pointer"
                    type="button"
                  >
                    <span>{t('dashboardOpenReport', language)}</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Maharashtra Higher Ed Rejection Cause Insights */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e6e8ea]">
            <h3 className="font-headline-sm text-headline-sm text-[#000412] font-bold mb-1">
              {t('dashboardRejectionTitle', language)}
            </h3>
            <p className="text-xs text-[#44474d] mb-4">
              {t('dashboardRejectionSub', language)}
            </p>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-[#191c1e]">
                    {t('dashboardReject1', language)}
                  </span>
                  <span className="font-bold text-[#ba1a1a]">{language === 'mr' ? '४२% अर्ज नाकारले' : '42% of rejections'}</span>
                </div>
                <div className="w-full bg-[#e6e8ea] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#ba1a1a] h-2 rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-[#191c1e]">
                    {t('dashboardReject2', language)}
                  </span>
                  <span className="font-bold text-[#3755c3]">{language === 'mr' ? '२८% अर्ज नाकारले' : '28% of rejections'}</span>
                </div>
                <div className="w-full bg-[#e6e8ea] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#3755c3] h-2 rounded-full" style={{ width: '28%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-[#191c1e]">
                    {t('dashboardReject3', language)}
                  </span>
                  <span className="font-bold text-[#173bab]">{language === 'mr' ? '१८% अर्ज नाकारले' : '18% of rejections'}</span>
                </div>
                <div className="w-full bg-[#e6e8ea] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#173bab] h-2 rounded-full" style={{ width: '18%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-[#191c1e]">
                    {t('dashboardReject4', language)}
                  </span>
                  <span className="font-bold text-[#13968a]">{language === 'mr' ? '१२% अर्ज नाकारले' : '12% of rejections'}</span>
                </div>
                <div className="w-full bg-[#e6e8ea] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#13968a] h-2 rounded-full" style={{ width: '12%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Deadlines & Quick Actions */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Live FastAPI Backend Connection Indicator */}
          <BackendConnectionTest language={language} />

          {/* Key Maharashtra Portal Deadlines */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e6e8ea]">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-[#3755c3] text-[20px]">event_note</span>
              <h3 className="font-headline-sm text-headline-sm text-[#000412] font-bold text-base">
                {t('dashboardDeadlinesTitle', language)}
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-[#f2f4f6] border border-[#e6e8ea]">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#000412]">{t('dashboardDeadline1Title', language)}</span>
                  <span className="bg-[#dde1ff] text-[#001453] px-1.5 py-0.5 rounded font-mono text-[10px]">
                    {t('dashboardActive', language)}
                  </span>
                </div>
                <div className="text-[#3755c3] font-bold mt-1">{t('dashboardDeadline1Date', language)}</div>
                <p className="text-[#44474d] text-[11px] mt-0.5">
                  {t('dashboardDeadline1Body', language)}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#f2f4f6] border border-[#e6e8ea]">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#000412]">{t('dashboardDeadline2Title', language)}</span>
                  <span className="bg-[#e6e8ea] text-[#44474d] px-1.5 py-0.5 rounded font-mono text-[10px]">
                    {t('dashboardUpcoming', language)}
                  </span>
                </div>
                <div className="text-[#191c1e] font-bold mt-1">{t('dashboardDeadline2Date', language)}</div>
                <p className="text-[#44474d] text-[11px] mt-0.5">
                  {t('dashboardDeadline2Body', language)}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#f2f4f6] border border-[#e6e8ea]">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#000412]">{t('dashboardDeadline3Title', language)}</span>
                  <span className="bg-[#e6e8ea] text-[#44474d] px-1.5 py-0.5 rounded font-mono text-[10px]">
                    {t('dashboardScheduled', language)}
                  </span>
                </div>
                <div className="text-[#191c1e] font-bold mt-1">{t('dashboardDeadline3Date', language)}</div>
                <p className="text-[#44474d] text-[11px] mt-0.5">
                  {t('dashboardDeadline3Body', language)}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Guidance Box */}
          <div className="bg-[#f2f4f6] rounded-xl p-5 border border-[#c5c6ce]">
            <span className="material-symbols-outlined text-[#3755c3] text-[24px]">school</span>
            <h4 className="font-semibold text-sm text-[#000412] mt-2 mb-1">
              {t('dashboardDeskTitle', language)}
            </h4>
            <p className="text-xs text-[#44474d] leading-relaxed mb-3">
              {t('dashboardDeskBody', language)}
            </p>
            <button
              onClick={() => onNavigate('readiness-report')}
              className="w-full py-2 rounded-lg bg-white border border-[#c5c6ce] text-xs font-semibold text-[#191c1e] hover:bg-[#eceef0] flex items-center justify-center gap-1 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              <span>{t('dashboardPrintDossier', language)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
