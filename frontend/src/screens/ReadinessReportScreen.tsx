import React, { useState } from 'react';
import { StatutoryBanner } from '../components/StatutoryBanner';
import { ScreenId, Language, FindingStatus, AuditReportData, FindingItem } from '../types';

interface ReadinessReportScreenProps {
  onNavigate: (screen: ScreenId) => void;
  language: Language;
  reportData: AuditReportData;
  onUpdateReportData: (updated: AuditReportData) => void;
  onOpenEditRecordModal: (findingId: string) => void;
}

export const ReadinessReportScreen: React.FC<ReadinessReportScreenProps> = ({
  onNavigate,
  language,
  reportData,
  onUpdateReportData,
  onOpenEditRecordModal,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | FindingStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [ocrSnippetOpen, setOcrSnippetOpen] = useState(false);
  const [shareToast, setShareToast] = useState(false);
  const [saveSuccessToast, setSaveSuccessToast] = useState(false);

  // Fast-track mock upload for missing income certificate
  const handleFastTrackIncomeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Update report findings: convert missing to verified
      const updatedFindings = reportData.findings.map((f) => {
        if (f.id === 'f-1') {
          return {
            ...f,
            type: 'verified' as FindingStatus,
            badgeLabel: 'Uploaded & Valid',
            flagReasonEn: `Uploaded "${file.name}" (${(file.size / 1024).toFixed(1)} KB). Tahsildar digital signature format verified for FY 2023-24.`,
            remediationActionEn: 'Document successfully cleared for MahaDBT submission.',
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
          badgeLabel: 'Barcode Confirmed',
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
    const matchesSearch =
      searchQuery === '' ||
      finding.searchPool.toLowerCase().includes(searchQuery.toLowerCase()) ||
      finding.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      finding.flagReasonEn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col w-full">
      {/* Toast Alerts */}
      {shareToast && (
        <div className="fixed top-24 right-6 z-50 bg-[#0f1e36] text-white px-4 py-2.5 rounded-lg shadow-xl text-xs font-semibold flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[18px] text-[#708cfd]">check_circle</span>
          <span>Sharable audit link copied to clipboard!</span>
        </div>
      )}

      {saveSuccessToast && (
        <div className="fixed top-24 right-6 z-50 bg-[#13968a] text-white px-4 py-2.5 rounded-lg shadow-xl text-xs font-semibold flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">verified</span>
          <span>Audit state saved to your student dashboard!</span>
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
          <span>Dashboard</span>
        </button>
        <span className="material-symbols-outlined text-[14px] text-[#75777e]">chevron_right</span>
        <button
          onClick={() => onNavigate('dashboard')}
          className="hover:text-[#000412] transition-colors cursor-pointer"
          type="button"
        >
          Document Checks
        </button>
        <span className="material-symbols-outlined text-[14px] text-[#75777e]">chevron_right</span>
        <span className="text-[#191c1e] font-semibold">Check #{reportData.prepId}</span>
        <span className="material-symbols-outlined text-[14px] text-[#75777e]">chevron_right</span>
        <span className="bg-[#000412] text-white px-2 py-0.5 rounded font-label-sm text-label-sm font-medium">
          Readiness Report
        </span>
      </div>

      {/* Regulatory Banner */}
      <StatutoryBanner language={language} />

      {/* Hero Header Card */}
      <div className="relative bg-white rounded-xl shadow-sm p-6 mb-6 overflow-hidden border border-[#c5c6ce]">
        {/* Subtle Institutional Backdrop Decor */}
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-[#708cfd]/10 pointer-events-none blur-3xl"></div>
        <div className="absolute right-32 top-8 text-[#e0e3e5]/60 select-none pointer-events-none hidden lg:block">
          <span className="material-symbols-outlined text-[140px] leading-none">policy</span>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col gap-1 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#dde1ff] text-[#001453] font-label-sm text-label-sm px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">verified</span> Pre-Submission Audit
              </span>
              <span className="text-[#44474d] font-label-sm text-label-sm">
                Application Prep ID: <span className="font-semibold text-[#191c1e]">{reportData.prepId}</span>
              </span>
              <span className="text-[#c5c6ce]">•</span>
              <span className="text-[#44474d] font-label-sm text-label-sm">
                Generated: {reportData.generatedDate}
              </span>
            </div>

            <h1 className="font-headline-lg text-headline-lg text-[#000412] tracking-tight mt-1">
              Document Readiness Audit Report
            </h1>

            <div className="mt-2 bg-[#f2f4f6] p-3 rounded-lg flex items-start gap-3 border border-[#e6e8ea]">
              <span className="material-symbols-outlined text-[#3755c3] text-[20px] mt-0.5 shrink-0">
                account_balance
              </span>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-[#44474d] uppercase tracking-wider">
                  Target Scholarship Scheme
                </span>
                <span className="font-label-lg text-label-lg text-[#191c1e] font-bold">
                  {reportData.schemeNameEn}
                </span>
                <span className="font-body-sm text-body-sm text-[#44474d]">
                  {reportData.departmentNameEn} • Candidate:{' '}
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
              <span>Download PDF Report</span>
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShareSummary}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-[#eceef0] text-[#191c1e] font-label-sm text-label-sm hover:bg-[#e6e8ea] transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">share</span>
                <span>Share Summary</span>
              </button>
              <button
                onClick={() => window.print()}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-[#eceef0] text-[#191c1e] font-label-sm text-label-sm hover:bg-[#e6e8ea] transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">print</span>
                <span>Print Checklist</span>
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
                Overall Readiness
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
              <span className="material-symbols-outlined text-[14px]">warning</span> Needs Attention
            </div>
            <p className="font-body-sm text-body-sm text-[#44474d] leading-snug">
              {reportData.missingCount > 0 || reportData.reviewCount > 0
                ? `${reportData.missingCount + reportData.reviewCount} items require verification before final submission on MahaDBT portal.`
                : 'All documents verified and ready for MahaDBT submission.'}
            </p>
          </div>
          <div className="mt-3 pt-1 text-[10px] text-[#75777e] flex items-center gap-1 leading-tight">
            <span className="material-symbols-outlined text-[12px]">info</span>
            <span>Advisory guidance only. Official approval rests solely with the competent authority.</span>
          </div>
        </div>

        {/* Card 2: Complete & Verified */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-[#e6e8ea] flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-[#44474d] uppercase tracking-wider font-semibold">
                Complete &amp; Verified
              </span>
              <span className="font-headline-md text-headline-md text-[#13968a] mt-1 font-bold">
                {reportData.verifiedCount} Documents
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#89f5e7] flex items-center justify-center text-[#13968a]">
              <span className="material-symbols-outlined text-[22px]">verified</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 flex-1 rounded-full ${
                    i < reportData.verifiedCount ? 'bg-[#13968a]' : 'bg-[#e6e8ea]'
                  }`}
                ></span>
              ))}
            </div>
            <p className="font-body-sm text-body-sm text-[#44474d]">
              Domicile, Fee Receipt, Ration Card &amp; Aadhaar Card pass schema heuristics.
            </p>
          </div>
          <div className="mt-1">
            <span className="font-label-sm text-label-sm text-[#13968a] font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">check_circle</span> Ready to archive
            </span>
          </div>
        </div>

        {/* Card 3: Needs Review */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-[#e6e8ea] flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-[#44474d] uppercase tracking-wider font-semibold">
                Needs Review
              </span>
              <span className="font-headline-md text-headline-md text-[#173bab] mt-1 font-bold">
                {reportData.reviewCount} Flagged
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#dde1ff] flex items-center justify-center text-[#173bab]">
              <span className="material-symbols-outlined text-[22px]">rule</span>
            </div>
          </div>
          <div className="mt-3">
            <div className="bg-[#f2f4f6] px-2 py-1.5 rounded text-[#44474d] font-body-sm text-body-sm space-y-1">
              <div className="flex items-center gap-1 font-semibold text-[#000412]">
                <span className="w-2 h-2 rounded-full bg-[#3755c3]"></span> Name match variation
              </div>
              <div className="flex items-center gap-1 font-semibold text-[#000412]">
                <span className="w-2 h-2 rounded-full bg-[#3755c3]"></span> Barcode validity query
              </div>
            </div>
          </div>
          <div className="mt-1">
            <span className="font-label-sm text-label-sm text-[#3755c3] font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">edit_note</span> Student action suggested
            </span>
          </div>
        </div>

        {/* Card 4: Missing Required */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-[#e6e8ea] flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-[#44474d] uppercase tracking-wider font-semibold">
                Missing Required
              </span>
              <span className="font-headline-md text-headline-md text-[#ba1a1a] mt-1 font-bold">
                {reportData.missingCount} Critical
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a]">
              <span className="material-symbols-outlined text-[22px]">crisis_alert</span>
            </div>
          </div>
          <div className="mt-3">
            <div className="bg-[#ffdad6]/40 p-2 rounded text-[#191c1e]">
              <span className="font-label-md text-label-md text-[#ba1a1a] block font-semibold">
                {reportData.missingCount > 0 ? 'Income Certificate' : 'None Missing'}
              </span>
              <span className="font-body-sm text-body-sm text-[#44474d]">
                {reportData.missingCount > 0 ? 'Tahsildar certified for FY 24-25 pending' : 'All required certificates attached'}
              </span>
            </div>
          </div>
          <div className="mt-1">
            <span className="font-label-sm text-label-sm text-[#ba1a1a] font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">priority_high</span> Mandatory for EBC benefit
            </span>
          </div>
        </div>
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
            All Findings ({reportData.findings.length})
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
            Missing ({reportData.missingCount})
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
            Needs Review ({reportData.reviewCount})
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
            Verified Ready ({reportData.verifiedCount})
          </button>
        </div>

        {/* Search Input Field */}
        <div className="relative w-full md:w-80">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-[#75777e]">
            search
          </span>
          <input
            className="w-full pl-9 pr-4 py-2 bg-[#f2f4f6] rounded-lg text-[#191c1e] font-body-sm text-body-sm focus:outline-none focus:bg-white border border-[#c5c6ce] shadow-xs placeholder:text-[#75777e]"
            placeholder="Filter by document name or field..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Detailed Findings & Discrepancies Matrix */}
      <div className="flex flex-col gap-4 mb-10">
        {filteredFindings.map((finding) => {
          if (finding.type === 'missing') {
            return (
              <div
                key={finding.id}
                className="bg-white rounded-xl shadow-sm border border-[#e6e8ea] overflow-hidden flex flex-col"
              >
                <div className="bg-[#ffdad6]/40 px-4 py-2 flex items-center justify-between border-b border-[#ffdad6]">
                  <div className="flex items-center gap-1.5 text-[#ba1a1a] font-label-md text-label-md font-semibold">
                    <span className="material-symbols-outlined text-[18px]">cancel</span>
                    <span>ACTION REQUIRED • MISSING CORE DOCUMENT</span>
                  </div>
                  <span className="font-label-sm text-label-sm text-[#44474d]">{finding.criterionTitle}</span>
                </div>

                <div className="p-6 flex flex-col lg:flex-row gap-6 items-start justify-between">
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <h2 className="font-headline-sm text-headline-sm text-[#000412] font-bold">
                        {finding.titleEn}
                      </h2>
                      <span className="px-2 py-0.5 rounded bg-[#ffdad6] text-[#ba1a1a] font-label-sm text-label-sm font-semibold">
                        {finding.badgeLabel}
                      </span>
                    </div>

                    <p className="font-body-md text-body-md text-[#191c1e] leading-relaxed mt-1">
                      <strong>Flag Reason:</strong> {finding.flagReasonEn}
                    </p>

                    <div className="bg-[#f2f4f6] p-3 rounded-lg mt-2 flex items-start gap-3 border border-[#e6e8ea]">
                      <span className="material-symbols-outlined text-[#3755c3] text-[20px] mt-0.5">
                        tips_and_updates
                      </span>
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md text-[#191c1e] font-semibold">
                          Recommended Remediation Action:
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
                      Fast-track upload
                    </span>
                    <label className="bg-white p-3 rounded-lg text-center flex flex-col items-center justify-center cursor-pointer hover:bg-[#eceef0] border border-dashed border-[#c5c6ce] transition-colors">
                      <span className="material-symbols-outlined text-[#3755c3] text-[32px]">
                        upload_file
                      </span>
                      <span className="font-label-md text-label-md text-[#000412] mt-1 font-semibold">
                        Select Income PDF
                      </span>
                      <span className="font-body-sm text-body-sm text-[#44474d]">PDF, Max 256 KB</span>
                      <input
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={handleFastTrackIncomeUpload}
                      />
                    </label>

                    <button
                      onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = '.pdf';
                        input.onchange = (e) =>
                          handleFastTrackIncomeUpload(
                            e as unknown as React.ChangeEvent<HTMLInputElement>
                          );
                        input.click();
                      }}
                      className="w-full py-2.5 rounded-lg bg-[#000412] text-white font-label-md text-label-md hover:bg-[#3755c3] transition-all flex items-center justify-center gap-1 shadow-sm cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">cloud_upload</span>
                      <span>Upload Income Certificate Now</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          }

          if (finding.type === 'review') {
            const isNameCheck = finding.id === 'f-2';
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
                        ? 'NEEDS REVIEW • IDENTITY CROSS-VERIFICATION'
                        : 'NEEDS REVIEW • ISSUANCE AGE & BARCODE VERIFICATION'}
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-[#44474d]">{finding.criterionTitle}</span>
                </div>

                <div className="p-6 flex flex-col gap-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2">
                    <div>
                      <h2 className="font-headline-sm text-headline-sm text-[#000412] font-bold">
                        {finding.titleEn}
                      </h2>
                      <p className="font-body-sm text-body-sm text-[#44474d] mt-0.5">
                        {isNameCheck
                          ? 'Differences detected between Board Qualifying Marksheet & Aadhaar Card Identity Data.'
                          : 'Issued 14 Aug 2021 (3.2 years old) • Cert No: DOM/2021/78912'}
                      </p>
                    </div>
                    <span className="bg-[#dde1ff] text-[#001453] font-label-sm text-label-sm px-3 py-1 rounded-full font-semibold flex items-center gap-1 self-start">
                      <span className="material-symbols-outlined text-[14px]">psychology</span>{' '}
                      {finding.badgeLabel}
                    </span>
                  </div>

                  {/* Comparative Cards for Name Mismatch */}
                  {isNameCheck && finding.docA && finding.docB && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#f2f4f6] p-4 rounded-xl border border-[#e6e8ea]">
                      <div className="bg-white p-3 rounded-lg flex flex-col gap-1 shadow-xs border border-[#e6e8ea]">
                        <div className="flex items-center justify-between">
                          <span className="font-label-sm text-label-sm text-[#44474d] uppercase font-semibold">
                            {finding.docA.title}
                          </span>
                          <span className="material-symbols-outlined text-[#3755c3] text-[16px]">badge</span>
                        </div>
                        <span className="font-label-lg text-label-lg text-[#000412] font-mono tracking-tight font-bold">
                          {finding.docA.value}
                        </span>
                        <span className="font-body-sm text-body-sm text-[#44474d]">
                          {finding.docA.meta}
                        </span>
                      </div>

                      <div className="bg-white p-3 rounded-lg flex flex-col gap-1 shadow-xs border border-[#e6e8ea]">
                        <div className="flex items-center justify-between">
                          <span className="font-label-sm text-label-sm text-[#ba1a1a] uppercase font-semibold">
                            {finding.docB.title}
                          </span>
                          <span className="material-symbols-outlined text-[#ba1a1a] text-[16px]">
                            history_edu
                          </span>
                        </div>
                        <span className="font-label-lg text-label-lg text-[#ba1a1a] font-mono tracking-tight font-bold">
                          {finding.docB.value}
                        </span>
                        <span className="font-body-sm text-body-sm text-[#44474d]">
                          {finding.docB.meta}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col gap-2">
                    <p className="font-body-md text-body-md text-[#191c1e] leading-relaxed">
                      <strong>Flag Reason:</strong> {finding.flagReasonEn}
                    </p>

                    <div className="bg-[#eceef0] p-3 rounded-lg flex items-start gap-3 border border-[#c5c6ce]/50">
                      <span className="material-symbols-outlined text-[#3755c3] text-[18px] mt-0.5">
                        verified_user
                      </span>
                      <p className="font-body-sm text-body-sm text-[#44474d] leading-relaxed">
                        <strong>College Desk Advice:</strong> {finding.remediationActionEn}
                      </p>
                    </div>
                  </div>

                  {/* OCR Details & Accordion */}
                  {isNameCheck && finding.detailsOcr && (
                    <div className="flex flex-col gap-2 pt-1 no-print">
                      <div className="bg-[#f2f4f6] rounded-lg p-3 border border-[#e6e8ea]">
                        <button
                          onClick={() => setOcrSnippetOpen(!ocrSnippetOpen)}
                          className="w-full flex items-center justify-between text-left font-label-md text-label-md text-[#191c1e] select-none cursor-pointer"
                          type="button"
                        >
                          <span className="flex items-center gap-2 font-semibold">
                            <span className="material-symbols-outlined text-[#3755c3] text-[18px]">
                              document_scanner
                            </span>
                            <span>View Side-by-Side OCR comparison snippet</span>
                          </span>
                          <span
                            className={`material-symbols-outlined text-[18px] text-[#75777e] transition-transform ${
                              ocrSnippetOpen ? 'rotate-180' : ''
                            }`}
                          >
                            expand_more
                          </span>
                        </button>

                        {ocrSnippetOpen && (
                          <div className="mt-3 pt-2 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono bg-white p-3 rounded border border-[#c5c6ce]">
                            <div className="p-2 bg-[#f2f4f6] rounded">
                              <div className="font-bold text-[#000412] mb-1">Aadhaar OCR Dump:</div>
                              <div className="text-[#44474d] leading-relaxed whitespace-pre-line">
                                {finding.detailsOcr.sourceA}
                              </div>
                            </div>
                            <div className="p-2 bg-[#f2f4f6] rounded">
                              <div className="font-bold text-[#000412] mb-1">
                                Maharashtra HSC Board OCR Dump:
                              </div>
                              <div className="text-[#44474d] leading-relaxed whitespace-pre-line">
                                {finding.detailsOcr.sourceB}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <button
                          onClick={() => onOpenEditRecordModal(finding.id)}
                          className="px-4 py-2 rounded-lg bg-[#e6e8ea] text-[#191c1e] font-label-sm text-label-sm hover:bg-[#d8dadc] transition-colors flex items-center gap-1 cursor-pointer font-semibold"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[16px]">edit</span>
                          <span>Edit Extracted Record</span>
                        </button>

                        <button
                          onClick={() => handleToggleStudentVerified(finding.id)}
                          className={`px-4 py-2 rounded-lg font-label-sm text-label-sm transition-colors flex items-center gap-1 shadow-sm cursor-pointer font-semibold ${
                            finding.verifiedByStudent
                              ? 'bg-[#89f5e7] text-[#00201d]'
                              : 'bg-[#0f1e36] text-white hover:bg-[#3755c3]'
                          }`}
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            {finding.verifiedByStudent ? 'check_circle' : 'thumb_up'}
                          </span>
                          <span>
                            {finding.verifiedByStudent
                              ? 'Verified by Candidate'
                              : 'Mark as Verified by Student'}
                          </span>
                        </button>
                        <span className="font-body-sm text-body-sm text-[#75777e] ml-auto hidden sm:inline">
                          Self-verification logged to audit log
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Barcode action module for Finding 3 */}
                  {!isNameCheck && (
                    <div className="w-full lg:w-72 bg-[#f2f4f6] p-4 rounded-xl flex flex-col gap-2 shrink-0 border border-[#c5c6ce] no-print">
                      <span className="font-label-sm text-label-sm text-[#44474d] uppercase tracking-wider font-semibold">
                        Aaple Sarkar Scan
                      </span>
                      <div className="p-2.5 rounded-lg bg-white border border-[#e6e8ea] flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#3755c3] text-[24px]">
                          qr_code_scanner
                        </span>
                        <div className="flex flex-col">
                          <span className="font-label-sm text-label-sm text-[#000412] font-semibold">
                            Barcode Detected
                          </span>
                          <span className="text-[11px] text-[#44474d] font-mono">
                            Payload: MAH/DOM/2021/78912
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleConfirmBarcode(finding.id)}
                        disabled={finding.barcodeConfirmed}
                        className={`w-full py-2.5 rounded-lg font-label-md text-label-md transition-all flex items-center justify-center gap-1 shadow-sm cursor-pointer ${
                          finding.barcodeConfirmed
                            ? 'bg-[#89f5e7] text-[#00201d] font-bold cursor-default'
                            : 'bg-[#000412] text-white hover:bg-[#3755c3]'
                        }`}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {finding.barcodeConfirmed ? 'verified' : 'check_box'}
                        </span>
                        <span>
                          {finding.barcodeConfirmed ? 'Barcode Confirmed Valid' : 'Confirm Barcode Valid'}
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          }

          // Verified Items
          return (
            <div
              key={finding.id}
              className="bg-white rounded-xl shadow-sm border border-[#e6e8ea] overflow-hidden flex flex-col"
            >
              <div className="bg-[#89f5e7]/30 px-4 py-2 flex items-center justify-between border-b border-[#89f5e7]/60">
                <div className="flex items-center gap-1.5 text-[#13968a] font-label-md text-label-md font-semibold">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span>VERIFIED READY • {finding.criterionTitle.toUpperCase()}</span>
                </div>
                <span className="font-label-sm text-label-sm text-[#44474d]">{finding.criterionTitle}</span>
              </div>

              <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#89f5e7] flex items-center justify-center text-[#13968a] shrink-0">
                    <span className="material-symbols-outlined text-[26px]">
                      {finding.id === 'f-4'
                        ? 'school'
                        : finding.id === 'f-5'
                        ? 'account_balance_wallet'
                        : finding.id === 'f-6'
                        ? 'groups'
                        : 'apartment'}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <h2 className="font-headline-sm text-headline-sm text-[#000412] font-semibold">
                      {finding.titleEn}
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
                    title="View Document Details"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                  </button>
                </div>
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
              Candidate Action Plan
            </span>
          </div>
          <h2 className="font-headline-md text-headline-md text-white mb-6 font-bold">
            Recommended Preparation Roadmap Before Official Submission
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
                  Resolve 2 Flagged Items
                </h3>
                <p className="font-body-sm text-body-sm text-[#7886a3] leading-relaxed">
                  Obtain the Tahsildar Income Certificate and prepare college name-inconsistency self-declaration.
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
                  Nodal Officer Pre-Check
                </h3>
                <p className="font-body-sm text-body-sm text-[#7886a3] leading-relaxed">
                  Present this printed audit dossier to your college Scholarship Clerk / Nodal Desk at COEP for clearance.
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
                  Enforce MahaDBT Specs
                </h3>
                <p className="font-body-sm text-body-sm text-[#7886a3] leading-relaxed">
                  Ensure all files are color scanned PDFs between 100 KB and 256 KB before uploading to official servers.
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
                  Final Submission
                </h3>
                <p className="font-body-sm text-body-sm text-[#7886a3] leading-relaxed">
                  Log in to <strong className="text-[#dde1ff]">mahadbt.maharashtra.gov.in</strong> and submit before the FY scheme cutoff.
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
            Important Statutory Notice
          </span>
          <p className="font-body-sm text-body-sm text-[#44474d] leading-relaxed">
            <strong>MahaScholar Guard</strong> is an independent document preparation and schema readiness audit assistant developed strictly for educational facilitation. It does not possess governmental authority to approve, sanction, process, or reject official scholarship schemes. Scholarship allocation and monetary disbursement remain under the sole constitutional and statutory jurisdiction of the Government of Maharashtra and relevant department scrutiny officers via the official portal at <em>mahadbt.maharashtra.gov.in</em>.
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
            <span>Back to Document Review</span>
          </button>
          <span className="hidden md:inline text-[#44474d] font-label-sm text-label-sm">
            Prep ID: {reportData.prepId}
          </span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => window.print()}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#3755c3] text-white font-label-md text-label-md hover:bg-[#173bab] transition-colors shadow-sm cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Download Full Advisory Dossier (PDF)</span>
          </button>

          <button
            onClick={handleFinishSave}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#000412] text-white font-label-md text-label-md hover:bg-[#3755c3] transition-colors shadow-sm cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>Finish &amp; Save to Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
};
