import React, { useState, useEffect, useCallback } from 'react';
import { StatutoryBanner } from '../components/StatutoryBanner';
import { ScreenId, Language, FindingStatus, AuditReportData, FindingItem } from '../types';
import { validateDocumentsWithBackend, BackendValidateResponse } from '../services/apiClient';
import { t } from '../i18n';
import { MOCK_SCHEMES } from '../services/scholarshipService';

interface ReadinessReportScreenProps {
  onNavigate: (screen: ScreenId) => void;
  language: Language;
  reportData: AuditReportData;
  onUpdateReportData: (updated: AuditReportData) => void;
  onOpenEditRecordModal: (findingId: string) => void;
  onFastTrackUpload?: (docCode: string, file: File) => void;
}

export const ReadinessReportScreen: React.FC<ReadinessReportScreenProps> = ({
  onNavigate,
  language,
  reportData,
  onUpdateReportData,
  onOpenEditRecordModal,
  onFastTrackUpload,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | FindingStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [shareToast, setShareToast] = useState(false);
  const [saveSuccessToast, setSaveSuccessToast] = useState(false);

  // Backend validation state
  const [backendValidation, setBackendValidation] = useState<{
    loading: boolean;
    data: BackendValidateResponse | null;
    error: string | null;
  }>({
    loading: false,
    data: null,
    error: null,
  });

  const runBackendValidation = useCallback(async (signal?: AbortSignal) => {
    setBackendValidation({ loading: true, data: null, error: null });

    // Collect present document codes from verified findings
    const presentCodes = reportData.findings
      .filter((f) => f.type === 'verified' && f.docCode)
      .map((f) => f.docCode as string);

    try {
      const response = await validateDocumentsWithBackend(
        {
          schemeId: reportData.schemeId,
          documentCodes: presentCodes,
          language: language,
        },
        signal
      );
      setBackendValidation({ loading: false, data: response, error: null });
    } catch (err: unknown) {
      if (signal?.aborted) return;
      const errorMsg = err instanceof Error ? err.message : t('validateError', language);
      setBackendValidation({ loading: false, data: null, error: errorMsg });
    }
  }, [reportData.schemeId, reportData.findings, language]);

  useEffect(() => {
    const controller = new AbortController();
    runBackendValidation(controller.signal);
    return () => {
      controller.abort();
    };
  }, [runBackendValidation]);

  // Fast-track upload for missing certificates
  const handleFastTrackFileChange = (docCode: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (onFastTrackUpload) {
        onFastTrackUpload(docCode, file);
      } else {
        const updatedFindings = reportData.findings.map((f) => {
          if (f.docCode === docCode || f.id === 'f-1') {
            return {
              ...f,
              type: 'verified' as FindingStatus,
              badgeLabel: language === 'mr' ? 'अपलोड व वैध' : 'Uploaded & Valid',
              flagReasonEn: `Uploaded "${file.name}" (${(file.size / 1024).toFixed(1)} KB). Format verified for submission.`,
              remediationActionEn: language === 'mr' ? 'कागदपत्र MahaDBT सादरणीसाठी मंजूर.' : 'Document successfully cleared for MahaDBT submission.',
            };
          }
          return f;
        });

        const newVerified = updatedFindings.filter((f) => f.type === 'verified').length;
        const newReview = updatedFindings.filter((f) => f.type === 'review').length;
        const newMissing = updatedFindings.filter((f) => f.type === 'missing').length;
        const newScore = Math.min(100, Math.round(((newVerified + newReview * 0.5) / updatedFindings.length) * 100));

        onUpdateReportData({
          ...reportData,
          findings: updatedFindings,
          verifiedCount: newVerified,
          reviewCount: newReview,
          missingCount: newMissing,
          overallReadiness: newScore,
        });
      }
    }
  };

  // Toggle student verification on finding 2
  const handleToggleStudentVerified = (findingId: string) => {
    const updatedFindings = reportData.findings.map((f) => {
      if (f.id === findingId) {
        return {
          ...f,
          verifiedByStudent: !f.verifiedByStudent,
        };
      }
      return f;
    });

    onUpdateReportData({
      ...reportData,
      findings: updatedFindings,
    });
  };

  // Confirm barcode valid on finding 3
  const handleConfirmBarcode = (findingId: string) => {
    const updatedFindings = reportData.findings.map((f) => {
      if (f.id === findingId) {
        return {
          ...f,
          barcodeConfirmed: true,
          badgeLabel: language === 'mr' ? 'बारकोड पुष्टी' : 'Barcode Confirmed',
        };
      }
      return f;
    });

    onUpdateReportData({
      ...reportData,
      findings: updatedFindings,
    });
  };

  const handleShareSummary = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setShareToast(true);
    setTimeout(() => setShareToast(false), 3000);
  };

  const handleFinishSave = () => {
    setSaveSuccessToast(true);
    setTimeout(() => {
      setSaveSuccessToast(false);
      onNavigate('dashboard');
    }, 1500);
  };

  // Filter & Search logic
  const filteredFindings = reportData.findings.filter((finding) => {
    const matchesFilter = activeFilter === 'all' || finding.type === activeFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      searchQuery === '' ||
      finding.searchPool.toLowerCase().includes(q) ||
      finding.titleEn.toLowerCase().includes(q) ||
      finding.titleMr.toLowerCase().includes(q) ||
      finding.flagReasonEn.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const currentScheme = MOCK_SCHEMES.find((s) => s.id === reportData.schemeId);
  const schemeName = language === 'mr' ? (currentScheme?.nameMr || reportData.schemeNameEn) : reportData.schemeNameEn;
  const deptName = language === 'mr' ? (currentScheme?.departmentMr || reportData.departmentNameEn) : reportData.departmentNameEn;

  return (
    <div className="flex flex-col w-full">
      {/* Toast Alerts */}
      {shareToast && (
        <div className="fixed top-24 right-6 z-50 bg-[#0f1e36] text-white px-4 py-2.5 rounded-lg shadow-xl text-xs font-semibold flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[18px] text-[#708cfd]">check_circle</span>
          <span>{t('reportShareToast', language)}</span>
        </div>
      )}

      {saveSuccessToast && (
        <div className="fixed top-24 right-6 z-50 bg-[#13968a] text-white px-4 py-2.5 rounded-lg shadow-xl text-xs font-semibold flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">verified</span>
          <span>{t('reportSaveToast', language)}</span>
        </div>
      )}

      {/* Breadcrumb Path */}
      <div className="flex items-center gap-1.5 mb-4 text-[#44474d] font-label-sm text-label-sm overflow-x-auto whitespace-nowrap py-1 no-print">
        <button
          onClick={() => onNavigate('dashboard')}
          className="hover:text-[#000412] transition-colors flex items-center gap-1 cursor-pointer"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">home</span>
          <span>{t('reportBreadcrumbDashboard', language)}</span>
        </button>
        <span className="material-symbols-outlined text-[14px] text-[#75777e]">chevron_right</span>
        <button
          onClick={() => onNavigate('dashboard')}
          className="hover:text-[#000412] transition-colors cursor-pointer"
          type="button"
        >
          {t('reportBreadcrumbChecks', language)}
        </button>
        <span className="material-symbols-outlined text-[14px] text-[#75777e]">chevron_right</span>
        <span className="text-[#191c1e] font-semibold">{t('reportBreadcrumbCheck', language)}{reportData.prepId}</span>
        <span className="material-symbols-outlined text-[14px] text-[#75777e]">chevron_right</span>
        <span className="bg-[#000412] text-white px-2 py-0.5 rounded font-label-sm text-label-sm font-medium">
          {t('reportBreadcrumbReport', language)}
        </span>
      </div>

      {/* Regulatory Banner */}
      <StatutoryBanner language={language} />

      {/* Hero Header Card */}
      <div className="relative bg-white rounded-xl shadow-sm p-6 mb-6 overflow-hidden border border-[#c5c6ce]">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-[#708cfd]/10 pointer-events-none blur-3xl"></div>
        <div className="absolute right-32 top-8 text-[#e0e3e5]/60 select-none pointer-events-none hidden lg:block">
          <span className="material-symbols-outlined text-[140px] leading-none">policy</span>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col gap-1 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#dde1ff] text-[#001453] font-label-sm text-label-sm px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">verified</span> {t('reportPreSubmissionBadge', language)}
              </span>
              <span className="text-[#44474d] font-label-sm text-label-sm">
                {t('reportPrepID', language)} <span className="font-semibold text-[#191c1e]">{reportData.prepId}</span>
              </span>
              <span className="text-[#c5c6ce]">•</span>
              <span className="text-[#44474d] font-label-sm text-label-sm">
                {t('reportGenerated', language)} {reportData.generatedDate}
              </span>
            </div>

            <h1 className="font-headline-lg text-headline-lg text-[#000412] tracking-tight mt-1">
              {t('reportTitle', language)}
            </h1>

            <div className="mt-2 bg-[#f2f4f6] p-3 rounded-lg flex items-start gap-3 border border-[#e6e8ea]">
              <span className="material-symbols-outlined text-[#3755c3] text-[20px] mt-0.5 shrink-0">
                account_balance
              </span>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-[#44474d] uppercase tracking-wider">
                  {t('reportTargetScheme', language)}
                </span>
                <span className="font-label-lg text-label-lg text-[#191c1e] font-bold">
                  {schemeName}
                </span>
                <span className="font-body-sm text-body-sm text-[#44474d]">
                  {deptName} • {t('reportCandidate', language)}{' '}
                  <strong className="text-[#191c1e] font-semibold">{reportData.studentName}</strong> ({reportData.collegeName})
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-row lg:flex-col sm:flex-row gap-2 shrink-0 no-print">
            <button
              onClick={() => window.print()}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#0f1e36] text-white font-label-md text-label-md hover:bg-[#3755c3] transition-all shadow-sm cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>{t('reportDownloadPDF', language)}</span>
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShareSummary}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-[#eceef0] text-[#191c1e] font-label-sm text-label-sm hover:bg-[#e6e8ea] transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">share</span>
                <span>{t('reportShareSummary', language)}</span>
              </button>
              <button
                onClick={() => window.print()}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-[#eceef0] text-[#191c1e] font-label-sm text-label-sm hover:bg-[#e6e8ea] transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">print</span>
                <span>{t('reportPrintChecklist', language)}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Metric Dashboard (4 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Card 1: Overall Readiness */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-[#e6e8ea] flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-[#44474d] uppercase tracking-wider font-semibold">
                {t('reportOverallReadiness', language)}
              </span>
              <span className="font-headline-md text-headline-md text-[#000412] mt-1 font-bold">
                {reportData.overallReadiness}%
              </span>
            </div>
            {/* Radial SVG Progress Gauge */}
            <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
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
              <span className="absolute font-label-sm text-label-sm font-bold text-[#3755c3]">
                {reportData.overallReadiness}%
              </span>
            </div>
          </div>
          <div>
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#dde1ff] text-[#001453] font-label-sm text-label-sm mb-1 font-semibold">
              <span className="material-symbols-outlined text-[14px]">warning</span> {t('reportNeedsAttention', language)}
            </div>
            <p className="font-body-sm text-body-sm text-[#44474d] leading-snug">
              {reportData.missingCount > 0 || reportData.reviewCount > 0
                ? `${reportData.missingCount + reportData.reviewCount} ${t('reportItemsNeedVerification', language)}`
                : t('reportAllVerified', language)}
            </p>
          </div>
          <div className="mt-3 pt-1 text-[10px] text-[#75777e] flex items-center gap-1 leading-tight">
            <span className="material-symbols-outlined text-[12px]">info</span>
            <span>{t('reportAdvisoryOnly', language)}</span>
          </div>
        </div>

        {/* Card 2: Complete & Verified */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-[#e6e8ea] flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-[#44474d] uppercase tracking-wider font-semibold">
                {t('reportCompleteVerified', language)}
              </span>
              <span className="font-headline-md text-headline-md text-[#13968a] mt-1 font-bold">
                {reportData.verifiedCount} {t('dashboardDocuments', language)}
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#89f5e7] flex items-center justify-center text-[#13968a]">
              <span className="material-symbols-outlined text-[22px]">verified</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: Math.max(1, reportData.findings.length) }).map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 flex-1 rounded-full ${
                    i < reportData.verifiedCount ? 'bg-[#13968a]' : 'bg-[#e6e8ea]'
                  }`}
                ></span>
              ))}
            </div>
            <p className="font-body-sm text-body-sm text-[#44474d]">
              {reportData.verifiedCount > 0
                ? `${reportData.verifiedCount} ${t('reportCriteriaCleared', language)} ${reportData.findings.length} ${t('reportCriteriaCleared2', language)} ${schemeName}.`
                : t('reportNoDocsYet', language)}
            </p>
          </div>
          <div className="mt-1">
            <span className="font-label-sm text-label-sm text-[#13968a] font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">check_circle</span> {t('reportReadyToArchive', language)}
            </span>
          </div>
        </div>

        {/* Card 3: Needs Review */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-[#e6e8ea] flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-[#44474d] uppercase tracking-wider font-semibold">
                {t('reportNeedsReview', language)}
              </span>
              <span className="font-headline-md text-headline-md text-[#173bab] mt-1 font-bold">
                {reportData.reviewCount} {t('reportFlagged', language)}
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#dde1ff] flex items-center justify-center text-[#173bab]">
              <span className="material-symbols-outlined text-[22px]">rule</span>
            </div>
          </div>
          <div className="mt-3">
            <div className="bg-[#f2f4f6] px-2 py-1.5 rounded text-[#44474d] font-body-sm text-body-sm space-y-1">
              {reportData.findings.filter((f) => f.type === 'review').slice(0, 2).map((f) => (
                <div key={f.id} className="flex items-center gap-1 font-semibold text-[#000412] truncate">
                  <span className="w-2 h-2 rounded-full bg-[#3755c3] shrink-0"></span>
                  <span className="truncate">{language === 'mr' ? f.titleMr : f.titleEn}</span>
                </div>
              ))}
              {reportData.reviewCount === 0 && (
                <div className="text-xs text-[#13968a]">{t('reportNoPendingReview', language)}</div>
              )}
            </div>
          </div>
          <div className="mt-1">
            <span className="font-label-sm text-label-sm text-[#3755c3] font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">edit_note</span> {t('reportStudentAction', language)}
            </span>
          </div>
        </div>

        {/* Card 4: Missing Required */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-[#e6e8ea] flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-[#44474d] uppercase tracking-wider font-semibold">
                {t('reportMissingRequired', language)}
              </span>
              <span className="font-headline-md text-headline-md text-[#ba1a1a] mt-1 font-bold">
                {reportData.missingCount} {t('reportCritical', language)}
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a]">
              <span className="material-symbols-outlined text-[22px]">crisis_alert</span>
            </div>
          </div>
          <div className="mt-3">
            <div className="bg-[#ffdad6]/40 p-2 rounded text-[#191c1e]">
              <span className="font-label-md text-label-md text-[#ba1a1a] block font-semibold truncate">
                {reportData.missingCount > 0
                  ? (language === 'mr'
                      ? (reportData.findings.find((f) => f.type === 'missing')?.titleMr || t('reportMissingRequired', language))
                      : (reportData.findings.find((f) => f.type === 'missing')?.titleEn || t('reportMissingRequired', language)))
                  : t('reportAllMandatory', language)}
              </span>
              <span className="font-body-sm text-body-sm text-[#44474d] text-xs">
                {reportData.missingCount > 0
                  ? `${reportData.missingCount} ${t('reportMissingCertPending', language)}`
                  : t('reportAllRequired', language)}
              </span>
            </div>
          </div>
          <div className="mt-1">
            <span className="font-label-sm text-label-sm text-[#ba1a1a] font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">priority_high</span>{' '}
              {reportData.missingCount > 0 ? t('reportMandatoryForApproval', language) : t('reportReadySubmission', language)}
            </span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* PART B: Backend Rules Engine Validation Card                        */}
      {/* ------------------------------------------------------------------- */}
      <div className="bg-white rounded-xl shadow-sm border border-[#c5c6ce] p-5 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-[#eceef0] gap-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#3755c3] text-[22px]">settings_suggest</span>
            <div>
              <h2 className="font-headline-sm text-headline-sm text-[#000412] font-bold text-sm">
                {t('validateTitle', language)}
              </h2>
              <span className="text-[11px] text-[#44474d]">
                FastAPI Endpoint: <code className="font-mono bg-[#f2f4f6] px-1 py-0.5 rounded">POST /api/validate</code>
              </span>
            </div>
          </div>

          <button
            onClick={() => runBackendValidation()}
            disabled={backendValidation.loading}
            className="self-start sm:self-auto px-3 py-1.5 rounded-lg bg-[#0f1e36] text-white text-xs font-semibold hover:bg-[#3755c3] transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-60"
            type="button"
          >
            <span className={`material-symbols-outlined text-[14px] ${backendValidation.loading ? 'animate-spin' : ''}`}>
              refresh
            </span>
            <span>{backendValidation.loading ? t('validateRunning', language) : t('validateRunBtn', language)}</span>
          </button>
        </div>

        {backendValidation.loading && (
          <div className="flex items-center gap-3 p-3 bg-[#f2f4f6] rounded-lg text-xs text-[#44474d]">
            <span className="w-2 h-2 rounded-full bg-[#3755c3] animate-pulse"></span>
            <span>{t('validateRunning', language)}</span>
          </div>
        )}

        {backendValidation.error && (
          <div className="bg-[#ffdad6]/50 border border-[#ffdad6] p-4 rounded-xl text-xs flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#ba1a1a] font-semibold">
              <span className="material-symbols-outlined text-[18px]">cloud_off</span>
              <span>{t('validateNotAvailable', language)}</span>
            </div>
            <p className="text-[#44474d]">
              {t('validateNotAvailableBody', language)}
            </p>
            <div className="pt-1">
              <button
                onClick={() => runBackendValidation()}
                type="button"
                className="px-3 py-1 bg-white border border-[#c5c6ce] rounded text-[11px] font-semibold text-[#191c1e] hover:bg-[#eceef0] cursor-pointer"
              >
                {t('validateRetry', language)}
              </button>
            </div>
          </div>
        )}

        {backendValidation.data && (
          <div className="flex flex-col gap-3">
            {/* Prototype unverified alert */}
            <div className="bg-[#fff8e1] border border-[#ffe082] p-3 rounded-lg flex items-start gap-2.5 text-xs text-[#5d4037]">
              <span className="material-symbols-outlined text-[#f57f17] text-[18px] shrink-0 mt-0.5">
                warning
              </span>
              <div className="flex flex-col">
                <span className="font-semibold text-[#e65100]">
                  Ruleset Status: <code className="font-mono font-bold">{backendValidation.data.rulesetStatus}</code>
                </span>
                <p className="mt-0.5">
                  {language === 'mr' ? backendValidation.data.warningMr : backendValidation.data.warningEn}
                </p>
              </div>
            </div>

            {/* Evaluation summary */}
            <div className="bg-[#f2f4f6] p-3.5 rounded-lg border border-[#e6e8ea] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex flex-col">
                <span className="font-semibold text-[#000412]">
                  {language === 'mr' ? backendValidation.data.summaryMr : backendValidation.data.summaryEn}
                </span>
                <span className="text-[11px] text-[#75777e] mt-0.5">
                  {language === 'mr' ? backendValidation.data.disclaimerMr : backendValidation.data.disclaimerEn}
                </span>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <span className="text-xs text-[#44474d]">{t('validateReadiness', language)}</span>
                <span
                  className={`px-2.5 py-1 rounded-full font-bold text-[11px] flex items-center gap-1 ${
                    backendValidation.data.isReady
                      ? 'bg-[#89f5e7] text-[#13968a]'
                      : 'bg-[#ffdad6] text-[#ba1a1a]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[13px]">
                    {backendValidation.data.isReady ? 'check_circle' : 'cancel'}
                  </span>
                  {backendValidation.data.isReady ? t('validateAllDocs', language) : t('validateIncomplete', language)}
                </span>
              </div>
            </div>

            {/* Missing docs breakdown from backend */}
            {backendValidation.data.missingDocuments.length > 0 && (
              <div className="p-3 bg-[#ffdad6]/20 border border-[#ffdad6] rounded-lg text-xs">
                <span className="font-semibold text-[#ba1a1a] block mb-1.5">
                  {t('validateMissingDocs', language)}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {backendValidation.data.missingDocuments.map((doc) => (
                    <span
                      key={doc.code}
                      className="bg-white border border-[#ffdad6] text-[#ba1a1a] px-2 py-0.5 rounded font-medium text-[11px]"
                    >
                      {language === 'mr' ? doc.nameMr : doc.nameEn} ({doc.code})
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Interactive Filter & Search Bar */}
      <div className="bg-white p-3 rounded-xl shadow-sm border border-[#e6e8ea] mb-4 flex flex-col md:flex-row items-center justify-between gap-3 no-print">
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-1.5 rounded-lg font-label-md text-label-md transition-colors cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#0f1e36] text-white font-bold'
                : 'bg-[#eceef0] text-[#44474d] hover:bg-[#e6e8ea]'
            }`}
            type="button"
          >
            {t('reportAllFindings', language)} ({reportData.findings.length})
          </button>
          <button
            onClick={() => setActiveFilter('missing')}
            className={`px-4 py-1.5 rounded-lg font-label-md text-label-md transition-colors cursor-pointer ${
              activeFilter === 'missing'
                ? 'bg-[#0f1e36] text-white font-bold'
                : 'bg-[#eceef0] text-[#44474d] hover:bg-[#e6e8ea]'
            }`}
            type="button"
          >
            {t('reportFilterMissing', language)} ({reportData.missingCount})
          </button>
          <button
            onClick={() => setActiveFilter('review')}
            className={`px-4 py-1.5 rounded-lg font-label-md text-label-md transition-colors cursor-pointer ${
              activeFilter === 'review'
                ? 'bg-[#0f1e36] text-white font-bold'
                : 'bg-[#eceef0] text-[#44474d] hover:bg-[#e6e8ea]'
            }`}
            type="button"
          >
            {t('reportFilterReview', language)} ({reportData.reviewCount})
          </button>
          <button
            onClick={() => setActiveFilter('verified')}
            className={`px-4 py-1.5 rounded-lg font-label-md text-label-md transition-colors cursor-pointer ${
              activeFilter === 'verified'
                ? 'bg-[#0f1e36] text-white font-bold'
                : 'bg-[#eceef0] text-[#44474d] hover:bg-[#e6e8ea]'
            }`}
            type="button"
          >
            {t('reportFilterVerified', language)} ({reportData.verifiedCount})
          </button>
        </div>

        {/* Search Finding */}
        <div className="relative w-full md:w-72">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-[#75777e]">
            search
          </span>
          <input
            type="text"
            className="w-full pl-9 pr-4 py-1.5 bg-[#f2f4f6] rounded-lg text-[#191c1e] text-xs focus:outline-none focus:bg-white border border-[#c5c6ce] placeholder:text-[#75777e]"
            placeholder={t('reportSearchPlaceholder', language)}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredFindings.length === 0 && (
        <div className="bg-white rounded-xl p-8 text-center border border-[#e6e8ea] mb-8 text-[#44474d] text-sm">
          {t('reportNoFindings', language)}
        </div>
      )}

      {/* Detailed Findings & Discrepancies Matrix */}
      <div className="flex flex-col gap-4 mb-10">
        {filteredFindings.map((finding) => {
          const findingTitle = language === 'mr' ? finding.titleMr : finding.titleEn;

          if (finding.type === 'missing') {
            return (
              <div
                key={finding.id}
                className="bg-white rounded-xl shadow-sm border border-[#e6e8ea] overflow-hidden flex flex-col"
              >
                <div className="bg-[#ffdad6]/40 px-4 py-2 flex items-center justify-between border-b border-[#ffdad6]">
                  <div className="flex items-center gap-1.5 text-[#ba1a1a] font-label-md text-label-md font-semibold">
                    <span className="material-symbols-outlined text-[18px]">cancel</span>
                    <span>
                      {language === 'mr'
                        ? 'कृती आवश्यक • अनिवार्य मुख्य कागदपत्र गहाळ'
                        : 'ACTION REQUIRED • MISSING CORE DOCUMENT'}
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-[#44474d]">{finding.criterionTitle}</span>
                </div>

                <div className="p-6 flex flex-col lg:flex-row gap-6 items-start justify-between">
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <h2 className="font-headline-sm text-headline-sm text-[#000412] font-bold">
                        {findingTitle}
                      </h2>
                      <span className="px-2 py-0.5 rounded bg-[#ffdad6] text-[#ba1a1a] font-label-sm text-label-sm font-semibold">
                        {language === 'mr' ? t('mandatory', language) : finding.badgeLabel}
                      </span>
                    </div>

                    <p className="font-body-md text-body-md text-[#191c1e] leading-relaxed mt-1">
                      <strong>{t('reportFlagReason', language)}</strong> {finding.flagReasonEn}
                    </p>

                    <div className="bg-[#f2f4f6] p-3 rounded-lg mt-2 flex items-start gap-3 border border-[#e6e8ea]">
                      <span className="material-symbols-outlined text-[#3755c3] text-[20px] mt-0.5">
                        tips_and_updates
                      </span>
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md text-[#191c1e] font-semibold">
                          {t('reportRemediation', language)}
                        </span>
                        <p className="font-body-sm text-body-sm text-[#44474d] mt-0.5 leading-relaxed">
                          {finding.remediationActionEn}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Fast-Track Upload Module */}
                  <div className="w-full lg:w-72 bg-[#f2f4f6] p-4 rounded-xl flex flex-col gap-2 shrink-0 border border-[#c5c6ce] no-print">
                    <span className="font-label-sm text-label-sm text-[#44474d] uppercase tracking-wider font-semibold">
                      {t('reportFastTrackUpload', language)}
                    </span>
                    <label className="bg-white p-3 rounded-lg text-center flex flex-col items-center justify-center cursor-pointer hover:bg-[#eceef0] border border-dashed border-[#c5c6ce] transition-colors">
                      <span className="material-symbols-outlined text-[#3755c3] text-[32px]">
                        upload_file
                      </span>
                      <span className="font-label-md text-label-md text-[#000412] mt-1 font-semibold truncate max-w-[200px]">
                        {findingTitle}
                      </span>
                      <span className="font-body-sm text-body-sm text-[#44474d]">PDF/Image, Max 256 KB</span>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                        onChange={(e) => handleFastTrackFileChange(finding.docCode || 'INCOME_CERT', e)}
                      />
                    </label>

                    <button
                      onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = '.pdf,.jpg,.jpeg,.png';
                        input.onchange = (e) =>
                          handleFastTrackFileChange(
                            finding.docCode || 'INCOME_CERT',
                            e as unknown as React.ChangeEvent<HTMLInputElement>
                          );
                        input.click();
                      }}
                      className="w-full py-2.5 rounded-lg bg-[#000412] text-white font-label-md text-label-md hover:bg-[#3755c3] transition-all flex items-center justify-center gap-1 shadow-sm cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">cloud_upload</span>
                      <span>{language === 'mr' ? `${findingTitle} अपलोड करा` : `Upload ${finding.titleEn}`}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          }

          if (finding.type === 'review') {
            const isNameCheck = Boolean(finding.docA && finding.docB);
            return (
              <div
                key={finding.id}
                className="bg-white rounded-xl shadow-sm border border-[#e6e8ea] overflow-hidden flex flex-col"
              >
                <div className="bg-[#dde1ff]/60 px-4 py-2 flex items-center justify-between border-b border-[#dde1ff]">
                  <div className="flex items-center gap-1.5 text-[#173bab] font-label-md text-label-md font-semibold">
                    <span className="material-symbols-outlined text-[18px]">warning</span>
                    <span>
                      {isNameCheck
                        ? (language === 'mr' ? 'पुनरावलोकन आवश्यक • ओळख पडताळणी' : 'NEEDS REVIEW • IDENTITY CROSS-VERIFICATION')
                        : (language === 'mr' ? 'पुनरावलोकन आवश्यक • दाखला वय व बारकोड पडताळणी' : 'NEEDS REVIEW • ISSUANCE AGE & BARCODE VERIFICATION')}
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-[#44474d]">{finding.criterionTitle}</span>
                </div>

                <div className="p-6 flex flex-col gap-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2">
                    <div>
                      <h2 className="font-headline-sm text-headline-sm text-[#000412] font-bold">
                        {findingTitle}
                      </h2>
                      <p className="font-body-sm text-body-sm text-[#44474d] mt-0.5">
                        {isNameCheck
                          ? (language === 'mr'
                              ? 'बोर्ड पात्रता गुणपत्रिका आणि आधार कार्डातील नावात तफावत आढळली.'
                              : 'Differences detected between Board Qualifying Marksheet & Aadhaar Card Identity Data.')
                          : (language === 'mr'
                              ? 'महाराष्ट्र अधिवास दाखला आपले सरकार बारकोड पडताळणी प्रलंबित आहे.'
                              : 'Aaple Sarkar digital repository confirmation recommended for COEP scrutiny.')}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded bg-[#dde1ff] text-[#001453] font-label-sm text-label-sm font-semibold">
                        {finding.badgeLabel}
                      </span>
                    </div>
                  </div>

                  <p className="font-body-md text-body-md text-[#191c1e] leading-relaxed">
                    <strong>{t('reportFlagReason', language)}</strong> {finding.flagReasonEn}
                  </p>

                  {/* Cross-Document Comparison Card if applicable */}
                  {finding.docA && finding.docB && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#f2f4f6] p-4 rounded-xl border border-[#e6e8ea]">
                      <div className="flex flex-col gap-1 p-3 bg-white rounded-lg border border-[#c5c6ce]">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#3755c3]">
                          {finding.docA.title}
                        </span>
                        <span className="font-mono text-sm font-bold text-[#000412]">{finding.docA.value}</span>
                        <span className="text-[11px] text-[#44474d] mt-1">{finding.docA.meta}</span>
                      </div>

                      <div className="flex flex-col gap-1 p-3 bg-white rounded-lg border border-[#c5c6ce]">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#ba1a1a]">
                          {finding.docB.title}
                        </span>
                        <span className="font-mono text-sm font-bold text-[#ba1a1a]">{finding.docB.value}</span>
                        <span className="text-[11px] text-[#44474d] mt-1">{finding.docB.meta}</span>
                      </div>
                    </div>
                  )}

                  {/* Remediation Note */}
                  <div className="bg-[#f2f4f6] p-3 rounded-lg flex items-start gap-3 border border-[#e6e8ea]">
                    <span className="material-symbols-outlined text-[#3755c3] text-[20px] mt-0.5">
                      tips_and_updates
                    </span>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md text-[#191c1e] font-semibold">
                        {t('reportRemediation', language)}
                      </span>
                      <p className="font-body-sm text-body-sm text-[#44474d] mt-0.5 leading-relaxed">
                        {finding.remediationActionEn}
                      </p>
                    </div>
                  </div>

                  {/* Interactive Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-2 no-print">
                    {finding.barcodeConfirmed !== undefined && (
                      <button
                        onClick={() => handleConfirmBarcode(finding.id)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                          finding.barcodeConfirmed
                            ? 'bg-[#13968a] text-white shadow-xs'
                            : 'bg-[#eceef0] text-[#191c1e] hover:bg-[#e6e8ea]'
                        }`}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">qr_code_scanner</span>
                        <span>
                          {finding.barcodeConfirmed ? t('reportBarcodeConfirmed', language) : t('reportBarcodeConfirm', language)}
                        </span>
                      </button>
                    )}

                    {finding.verifiedByStudent !== undefined && (
                      <button
                        onClick={() => handleToggleStudentVerified(finding.id)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                          finding.verifiedByStudent
                            ? 'bg-[#13968a] text-white shadow-xs'
                            : 'bg-[#eceef0] text-[#191c1e] hover:bg-[#e6e8ea]'
                        }`}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">assignment_turned_in</span>
                        <span>
                          {finding.verifiedByStudent ? t('reportAffidavitMarked', language) : t('reportAffidavitNote', language)}
                        </span>
                      </button>
                    )}

                    {isNameCheck && (
                      <button
                        onClick={() => onOpenEditRecordModal(finding.id)}
                        className="px-3.5 py-1.5 rounded-lg bg-[#0f1e36] text-white text-xs font-semibold hover:bg-[#3755c3] flex items-center gap-1 transition-colors cursor-pointer"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">edit</span>
                        <span>{t('editRecordTitle', language)}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          }

          // Verified Finding Card
          return (
            <div
              key={finding.id}
              className="bg-white rounded-xl shadow-sm border border-[#e6e8ea] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#89f5e7] flex items-center justify-center text-[#13968a] shrink-0">
                  <span className="material-symbols-outlined text-[26px]">
                    {finding.docCode === 'HSC_MARKSHEET'
                      ? 'school'
                      : finding.docCode === 'AADHAAR_CARD' || finding.id === 'f-5'
                      ? 'account_balance_wallet'
                      : finding.docCode === 'RATION_CARD' || finding.id === 'f-6'
                      ? 'groups'
                      : finding.docCode === 'COLLEGE_BONAFIDE' || finding.id === 'f-4'
                      ? 'apartment'
                      : finding.docCode === 'DOMICILE_CERT' || finding.id === 'f-7'
                      ? 'home_pin'
                      : finding.docCode === 'INCOME_CERT'
                      ? 'payments'
                      : 'task_alt'}
                  </span>
                </div>
                <div className="flex flex-col">
                  <h2 className="font-headline-sm text-headline-sm text-[#000412] font-semibold">
                    {findingTitle}
                  </h2>
                  <span className="font-body-md text-body-md text-[#191c1e] mt-0.5">
                    {finding.flagReasonEn}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <span className="px-3 py-1 rounded-full bg-[#89f5e7] text-[#13968a] font-label-sm text-label-sm font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">done_all</span>{' '}
                  {finding.badgeLabel}
                </span>
                <button
                  onClick={() => onNavigate('document-review')}
                  className="p-2 rounded-lg hover:bg-[#eceef0] transition-colors text-[#44474d] cursor-pointer"
                  title={t('dashboardReviewData', language)}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">visibility</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Guidance & Next Steps Roadmap Bento Box */}
      <div className="bg-[#0f1e36] text-white rounded-xl p-6 md:p-8 mb-6 shadow-md relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-[#3755c3]/20 pointer-events-none blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-1.5 mb-1 text-[#dde1ff]">
            <span className="material-symbols-outlined text-[20px]">flag</span>
            <span className="font-label-md text-label-md uppercase tracking-wider font-semibold">
              {t('reportActionRoadmap', language)}
            </span>
          </div>
          <h2 className="font-headline-md text-headline-md text-white mb-6 font-bold">
            {t('reportActionSubtext', language)}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Step 1 */}
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl flex flex-col justify-between border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="w-7 h-7 rounded-full bg-[#dde1ff] text-[#001453] font-label-md text-label-md font-bold flex items-center justify-center">
                  1
                </span>
                <span className="material-symbols-outlined text-[#dde1ff] text-[20px]">rule_folder</span>
              </div>
              <div>
                <h3 className="font-label-lg text-label-lg text-white mb-1 font-semibold">
                  {reportData.missingCount > 0 ? t('reportStep1Complete', language) : t('reportStep1Done', language)}
                </h3>
                <p className="font-body-sm text-body-sm text-[#7886a3] leading-relaxed">
                  {reportData.missingCount > 0
                    ? `${reportData.missingCount} ${t('reportMissingCertPending', language)}`
                    : t('reportAllRequired', language)}
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl flex flex-col justify-between border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="w-7 h-7 rounded-full bg-[#dde1ff] text-[#001453] font-label-md text-label-md font-bold flex items-center justify-center">
                  2
                </span>
                <span className="material-symbols-outlined text-[#dde1ff] text-[20px]">support_agent</span>
              </div>
              <div>
                <h3 className="font-label-lg text-label-lg text-white mb-1 font-semibold">
                  {t('reportStep2', language)}
                </h3>
                <p className="font-body-sm text-body-sm text-[#7886a3] leading-relaxed">
                  {language === 'mr'
                    ? 'अधिवास बारकोड किंवा नावातील अक्षरांची विसंगती प्रतिज्ञापत्राद्वारे (Annexure A) सोडवा.'
                    : 'Resolve name abbreviation or barcode issues using college self-affidavit.'}
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl flex flex-col justify-between border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="w-7 h-7 rounded-full bg-[#dde1ff] text-[#001453] font-label-md text-label-md font-bold flex items-center justify-center">
                  3
                </span>
                <span className="material-symbols-outlined text-[#dde1ff] text-[20px]">compress</span>
              </div>
              <div>
                <h3 className="font-label-lg text-label-lg text-white mb-1 font-semibold">
                  {t('reportStep3', language)}
                </h3>
                <p className="font-body-sm text-body-sm text-[#7886a3] leading-relaxed">
                  {language === 'mr'
                    ? 'हा मुद्रित अहवाल महाविद्यालयाच्या शिष्यवृत्ती लिपिक किंवा नोडल डेस्ककडे पडताळणीसाठी न्या.'
                    : 'Present this printed dossier to your college Scholarship Desk before online portal submission.'}
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl flex flex-col justify-between border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="w-7 h-7 rounded-full bg-[#dde1ff] text-[#001453] font-label-md text-label-md font-bold flex items-center justify-center">
                  4
                </span>
                <span className="material-symbols-outlined text-[#dde1ff] text-[20px]">open_in_new</span>
              </div>
              <div>
                <h3 className="font-label-lg text-label-lg text-white mb-1 font-semibold">
                  {t('reportStep4', language)}
                </h3>
                <p className="font-body-sm text-body-sm text-[#7886a3] leading-relaxed">
                  {language === 'mr'
                    ? 'mahadbt.maharashtra.gov.in वर लॉग इन करून अंतिम मुदतीपूर्वी अर्ज पूर्ण करा.'
                    : 'Log in to mahadbt.maharashtra.gov.in and submit before the FY cutoff.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Strict Statutory Non-Governmental Disclaimer Box */}
      <div className="bg-[#f2f4f6] p-4 rounded-xl mb-6 flex items-start gap-4 border border-[#c5c6ce]/70">
        <div className="w-10 h-10 rounded-lg bg-[#e6e8ea] flex items-center justify-center shrink-0 text-[#44474d]">
          <span className="material-symbols-outlined text-[22px]">gavel</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-label-md text-label-md text-[#191c1e] uppercase tracking-wider font-semibold">
            {t('statutoryDisclaimer', language)}
          </span>
          <p className="font-body-sm text-body-sm text-[#44474d] leading-relaxed">
            {t('statutoryText', language)}
          </p>
        </div>
      </div>

      {/* Sticky / Bottom Page Action Bar */}
      <div className="bg-white p-4 rounded-xl shadow-md border border-[#c5c6ce] flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => onNavigate('document-review')}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#eceef0] text-[#191c1e] font-label-md text-label-md hover:bg-[#e6e8ea] transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>{t('reviewBackBtn', language)}</span>
          </button>
          <span className="hidden md:inline text-[#44474d] font-label-sm text-label-sm">
            {t('reportPrepID', language)} {reportData.prepId}
          </span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => window.print()}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#3755c3] text-white font-label-md text-label-md hover:bg-[#173bab] transition-colors shadow-sm cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>{t('reportDownloadPDF', language)}</span>
          </button>

          <button
            onClick={handleFinishSave}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#000412] text-white font-label-md text-label-md hover:bg-[#3755c3] transition-colors shadow-sm cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>{t('reportFinishSave', language)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
