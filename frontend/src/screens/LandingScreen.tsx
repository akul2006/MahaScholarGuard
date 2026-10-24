import React, { useState } from 'react';
import { StatutoryBanner } from '../components/StatutoryBanner';
import { ScreenId, Language } from '../types';

interface LandingScreenProps {
  onNavigate: (screen: ScreenId) => void;
  language: Language;
  onOpenWalkthrough: () => void;
  onOpenRules: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({
  onNavigate,
  language,
  onOpenWalkthrough,
  onOpenRules,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="flex flex-col w-full">
      {/* 1. Regulatory Banner */}
      <StatutoryBanner language={language} />

      {/* 2. Hero Section: Asymmetric Split Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-10">
        {/* Left Hero Column */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-[#eceef0] text-[#3755c3]">
            <span className="material-symbols-outlined text-[16px]">account_balance</span>
            <span className="font-label-sm text-label-sm uppercase tracking-wide font-semibold">
              Civic-Tech • Maharashtra Higher Education Support
            </span>
          </div>

          <h1 className="font-headline-xl text-headline-xl text-[#000412] font-bold tracking-tight">
            Your Scholarship Papers.<br />
            <span className="text-[#3755c3]">Audited &amp; Verified</span> Before Portal Upload.
          </h1>

          <p className="font-body-lg text-body-lg text-[#44474d] max-w-2xl leading-relaxed">
            Avoid last-minute scrutinies and rejected portal claims. Audit your Caste Validity, Tahsildar Income Slip, Domicile, and SSC/HSC marksheets against active Maharashtra state requirements in seconds.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <button
              onClick={() => onNavigate('upload-wizard')}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0f1e36] text-white font-label-lg text-label-lg hover:bg-[#3755c3] transition-all shadow-md group cursor-pointer"
              type="button"
            >
              <span>Check My Documents Now</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>

            <button
              onClick={onOpenWalkthrough}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#eceef0] text-[#191c1e] font-label-lg text-label-lg hover:bg-[#e6e8ea] transition-all cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] text-[#3755c3]">play_circle</span>
              <span>See Verification Walkthrough</span>
            </button>
          </div>

          {/* Trust Badges Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
            <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-xs border border-[#e6e8ea]">
              <span className="material-symbols-outlined text-[#13968a] text-[18px]">verified</span>
              <span className="font-label-sm text-label-sm text-[#191c1e] font-medium">100% Free For All Students</span>
            </div>
            <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-xs border border-[#e6e8ea]">
              <span className="material-symbols-outlined text-[#3755c3] text-[18px]">lock_reset</span>
              <span className="font-label-sm text-label-sm text-[#191c1e] font-medium">Ephemeral / Zero Data Retention</span>
            </div>
            <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-xs border border-[#e6e8ea]">
              <span className="material-symbols-outlined text-[#000412] text-[18px]">timer</span>
              <span className="font-label-sm text-label-sm text-[#191c1e] font-medium">Audit Results in &lt; 90 Sec</span>
            </div>
          </div>
        </div>

        {/* Right Hero Column: Interactive Simulation Card */}
        <div className="lg:col-span-5 relative">
          <div className="w-full bg-white rounded-xl p-6 shadow-xl border border-[#c5c6ce] relative overflow-hidden">
            {/* Card Top Accents */}
            <div className="flex items-center justify-between pb-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3755c3] animate-pulse"></span>
                <span className="font-label-sm text-label-sm text-[#191c1e] uppercase font-bold tracking-wide">
                  Live Audit Engine Demo
                </span>
              </div>
              <span className="font-label-sm text-label-sm bg-[#eceef0] px-2 py-0.5 rounded text-[#44474d]">
                SPPU / Pune Eng. Cluster
              </span>
            </div>

            <div className="bg-[#f2f4f6] rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-1">
                <div>
                  <span className="font-headline-sm text-headline-sm text-[#000412] font-bold">
                    RJC-Shahu Scheme
                  </span>
                  <p className="font-label-sm text-label-sm text-[#44474d]">
                    Candidate: Aarav Suresh Deshmukh
                  </p>
                </div>
                {/* Score Ring Mini SVG */}
                <div className="relative w-14 h-14 flex items-center justify-center">
                  <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
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
                      strokeDasharray="78, 100"
                      strokeLinecap="round"
                      strokeWidth="3.5"
                    />
                  </svg>
                  <span className="absolute font-label-md text-label-md font-bold text-[#000412]">
                    78%
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#3755c3]"></span>
                <span className="font-label-sm text-label-sm text-[#3755c3] font-semibold">
                  2 Critical Action Items Require Attention
                </span>
              </div>
            </div>

            {/* Document Checks List */}
            <div className="space-y-2">
              {/* Item 1: Domicile */}
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#f7f9fb] hover:bg-[#eceef0] transition-colors">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#13968a] text-[20px]">check_circle</span>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-[#191c1e] leading-tight">
                      Maharashtra Domicile Certificate
                    </span>
                    <span className="font-label-sm text-label-sm text-[#44474d]">
                      Tahsildar Haveli • Barcode Validated
                    </span>
                  </div>
                </div>
                <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-[#eceef0] text-[#13968a] font-semibold">
                  Ready
                </span>
              </div>

              {/* Item 2: Income */}
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#f7f9fb] hover:bg-[#eceef0] transition-colors">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#13968a] text-[20px]">check_circle</span>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-[#191c1e] leading-tight">
                      Income Certificate FY 2023-24
                    </span>
                    <span className="font-label-sm text-label-sm text-[#44474d]">
                      Annual INR 1,80,000 • Valid till 31 Mar 2025
                    </span>
                  </div>
                </div>
                <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-[#eceef0] text-[#13968a] font-semibold">
                  Valid
                </span>
              </div>

              {/* Item 3: Marksheet Name Mismatch */}
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#e6e8ea]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#3755c3] text-[20px]">error</span>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-[#191c1e] leading-tight">
                      HSC Class 12 Marksheet
                    </span>
                    <span className="font-label-sm text-label-sm text-[#44474d]">
                      Name reads &ldquo;Deshmukh Aarav S.&rdquo; vs Aadhaar format
                    </span>
                  </div>
                </div>
                <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-[#eceef0] text-[#3755c3] font-semibold">
                  Review
                </span>
              </div>

              {/* Item 4: Caste Validity */}
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#ffdad6]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#ba1a1a] text-[20px]">cancel</span>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-[#93000a] leading-tight">
                      Caste Validity Certificate
                    </span>
                    <span className="font-label-sm text-label-sm text-[#93000a]">
                      Missing. Mandatory for Reserved Category
                    </span>
                  </div>
                </div>
                <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-white text-[#ba1a1a] font-bold">
                  Missing
                </span>
              </div>
            </div>

            <div className="mt-4 pt-2 bg-[#f2f4f6] p-2.5 rounded-lg flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-[#44474d]">
                Simulated preliminary check output
              </span>
              <button
                onClick={() => onNavigate('readiness-report')}
                className="font-label-sm text-label-sm text-[#3755c3] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                type="button"
              >
                <span>View Full Audit Report</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Break / Civic College Ambience Callout */}
      <section className="w-full relative rounded-xl overflow-hidden shadow-md mb-10 bg-[#0f1e36]">
        <div className="w-full bg-[#0f1e36]/95 p-6 md:p-8 flex flex-col justify-center items-start text-white">
          <span className="font-label-md text-label-md uppercase tracking-wider text-[#708cfd]">
            Over 48,000 Application Rejections Annually in Maharashtra
          </span>
          <h2 className="font-headline-md text-headline-md font-bold mt-1 mb-2 text-white">
            Simple Name Spelling Inconsistencies Delay Education Grants for Months
          </h2>
          <p className="font-body-md text-body-md text-[#b8c7e6] max-w-3xl leading-relaxed">
            MahaScholar Guard standardizes your document readiness portfolio so your college scholarship clerk can sanction your file on the first scrutiny round.
          </p>
        </div>
      </section>

      {/* 3. Core Trust Pillars: Why Pre-Check Matters */}
      <section className="mb-10">
        <div className="flex flex-col mb-4">
          <span className="font-label-md text-label-md uppercase tracking-wider text-[#3755c3] font-semibold">
            Proactive Verification Methodology
          </span>
          <h2 className="font-headline-lg text-headline-lg text-[#000412] font-bold">
            Why Verification Prior to MahaDBT Submission Is Critical
          </h2>
          <p className="font-body-md text-body-md text-[#44474d] max-w-2xl">
            Aaple Sarkar Seva Kendras and college administration clerks reject over 30% of freshman folders for minor clerical anomalies. Our offline-ready engine pinpoints them instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-[#e6e8ea] flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#eceef0] flex items-center justify-center text-[#000412] mb-4">
                <span className="material-symbols-outlined text-[28px]">search_check</span>
              </div>
              <span className="font-label-sm text-label-sm text-[#3755c3] uppercase font-bold tracking-wider">
                Gap Detection
              </span>
              <h3 className="font-headline-sm text-headline-sm text-[#000412] font-semibold mt-1 mb-2">
                Detect Missing Mandatories
              </h3>
              <p className="font-body-md text-body-md text-[#44474d]">
                Scheme requirements differ sharply between EBC, SC/ST, and OBC schemes. We run deterministic checklist logic to ensure you do not omit crucial forms like Non-Creamy Layer or Caste Validity.
              </p>
            </div>
            <div className="mt-4 pt-2 bg-[#f2f4f6] p-2 rounded font-label-sm text-label-sm text-[#191c1e]">
              Includes latest 2024-25 GR rules
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-[#e6e8ea] flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#eceef0] flex items-center justify-center text-[#3755c3] mb-4">
                <span className="material-symbols-outlined text-[28px]">spellcheck</span>
              </div>
              <span className="font-label-sm text-label-sm text-[#3755c3] uppercase font-bold tracking-wider">
                Discrepancy Flags
              </span>
              <h3 className="font-headline-sm text-headline-sm text-[#000412] font-semibold mt-1 mb-2">
                Detect Name &amp; Date Discrepancies
              </h3>
              <p className="font-body-md text-body-md text-[#44474d]">
                Flags minor naming variations between your 10th Board Certificate, Aadhaar Card, and Bank Passbook (e.g., father&apos;s middle name spelling or Marathi transliteration errors) before submission.
              </p>
            </div>
            <div className="mt-4 pt-2 bg-[#f2f4f6] p-2 rounded font-label-sm text-label-sm text-[#191c1e]">
              Includes Gazette Affidavit format guidance
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-[#e6e8ea] flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#eceef0] flex items-center justify-center text-[#13968a] mb-4">
                <span className="material-symbols-outlined text-[28px]">description</span>
              </div>
              <span className="font-label-sm text-label-sm text-[#3755c3] uppercase font-bold tracking-wider">
                Actionable PDF Checklists
              </span>
              <h3 className="font-headline-sm text-headline-sm text-[#000412] font-semibold mt-1 mb-2">
                Download College Ready dossier
              </h3>
              <p className="font-body-md text-body-md text-[#44474d]">
                Generate a clean, printable single-page Document Health Slip with flagged remediation tasks to carry straight to your college scholarship desk or local Setu Kendra.
              </p>
            </div>
            <div className="mt-4 pt-2 bg-[#f2f4f6] p-2 rounded font-label-sm text-label-sm text-[#191c1e]">
              Free PDF remediation sheet
            </div>
          </div>
        </div>
      </section>

      {/* 4. How It Works (Four Step Sequential Grid) */}
      <section className="mb-10 bg-[#f2f4f6] p-6 md:p-8 rounded-xl shadow-sm border border-[#e6e8ea]" id="how-it-works">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-2">
          <div>
            <span className="font-label-md text-label-md uppercase tracking-wider text-[#3755c3] font-semibold">
              Step-by-Step Guidance
            </span>
            <h2 className="font-headline-lg text-headline-lg text-[#000412] font-bold">
              How MahaScholar Guard Prepares Your Dossier
            </h2>
          </div>
          <span className="font-label-md text-label-md text-[#44474d]">
            Estimated completion time: 2 Minutes
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div
            onClick={() => onNavigate('scheme-selection')}
            className="bg-white p-4 rounded-xl shadow-sm border border-[#e6e8ea] flex flex-col justify-between hover:border-[#3755c3] cursor-pointer transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-full bg-[#0f1e36] text-white font-bold flex items-center justify-center font-label-md text-label-md">
                  01
                </span>
                <span className="material-symbols-outlined text-[#3755c3]">list_alt</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-[#000412] font-semibold mb-1">
                Select Scheme
              </h3>
              <p className="font-body-sm text-body-sm text-[#44474d]">
                Choose your targeted scheme (e.g. Rajarshi Shahu Maharaj Tuition Fee Freeship, Post-Matric OBC/SC/ST, or Minority Fellowship).
              </p>
            </div>
            <div className="pt-4 font-label-sm text-label-sm text-[#3755c3] font-medium flex items-center justify-between">
              <span>Over 24 State Schemes</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </div>
          </div>

          {/* Step 2 */}
          <div
            onClick={() => onNavigate('upload-wizard')}
            className="bg-white p-4 rounded-xl shadow-sm border border-[#e6e8ea] flex flex-col justify-between hover:border-[#3755c3] cursor-pointer transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-full bg-[#0f1e36] text-white font-bold flex items-center justify-center font-label-md text-label-md">
                  02
                </span>
                <span className="material-symbols-outlined text-[#3755c3]">cloud_upload</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-[#000412] font-semibold mb-1">
                Upload Docs Securely
              </h3>
              <p className="font-body-sm text-body-sm text-[#44474d]">
                Drag and drop PDFs or photos of certificates. All files are inspected in-memory with local encryption and zero database retention.
              </p>
            </div>
            <div className="pt-4 font-label-sm text-label-sm text-[#3755c3] font-medium flex items-center justify-between">
              <span>Client-side OCR processing</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </div>
          </div>

          {/* Step 3 */}
          <div
            onClick={() => onNavigate('document-review')}
            className="bg-white p-4 rounded-xl shadow-sm border border-[#e6e8ea] flex flex-col justify-between hover:border-[#3755c3] cursor-pointer transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-full bg-[#0f1e36] text-white font-bold flex items-center justify-center font-label-md text-label-md">
                  03
                </span>
                <span className="material-symbols-outlined text-[#3755c3]">fact_check</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-[#000412] font-semibold mb-1">
                Review Extracted Data
              </h3>
              <p className="font-body-sm text-body-sm text-[#44474d]">
                Verify parsed student name, income figures, issuance dates, issuing officers (Tahsildar/Sub-Divisional Magistrate), and barcodes.
              </p>
            </div>
            <div className="pt-4 font-label-sm text-label-sm text-[#3755c3] font-medium flex items-center justify-between">
              <span>Bilingual Marathi/English view</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </div>
          </div>

          {/* Step 4 */}
          <div
            onClick={() => onNavigate('readiness-report')}
            className="bg-white p-4 rounded-xl shadow-sm border border-[#e6e8ea] flex flex-col justify-between hover:border-[#3755c3] cursor-pointer transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-full bg-[#0f1e36] text-white font-bold flex items-center justify-center font-label-md text-label-md">
                  04
                </span>
                <span className="material-symbols-outlined text-[#3755c3]">assignment_turned_in</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-[#000412] font-semibold mb-1">
                Get Action Report
              </h3>
              <p className="font-body-sm text-body-sm text-[#44474d]">
                Receive your overall Readiness Grade (Ready, Caution, or Incomplete) along with actionable fixes before visiting MahaDBT portal.
              </p>
            </div>
            <div className="pt-4 font-label-sm text-label-sm text-[#3755c3] font-medium flex items-center justify-between">
              <span>Instant PDF Download</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Supported Schemes & State Departments Matrix */}
      <section className="mb-10">
        <div className="flex flex-col mb-4">
          <span className="font-label-md text-label-md uppercase tracking-wider text-[#3755c3] font-semibold">
            Eligibility &amp; Department Coverage
          </span>
          <h2 className="font-headline-lg text-headline-lg text-[#000412] font-bold">
            Supported Maharashtra Scholarship Frameworks
          </h2>
          <p className="font-body-md text-body-md text-[#44474d]">
            Document criteria rules are mapped against current regulations from major Maharashtra administrative directorates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Dept 1 */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-[#e6e8ea]">
            <div className="flex items-center gap-1.5 mb-1.5 text-[#3755c3]">
              <span className="material-symbols-outlined text-[20px]">school</span>
              <span className="font-label-md text-label-md font-bold">Higher &amp; Technical Ed</span>
            </div>
            <p className="font-body-sm text-body-sm text-[#44474d] mb-3">
              DTE / DHE Maharashtra programs including Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Yojna.
            </p>
            <div className="space-y-1">
              <div className="font-label-sm text-label-sm text-[#191c1e] bg-[#f2f4f6] px-2 py-1 rounded">
                • Income Cap: &le; 8 Lakhs
              </div>
              <div className="font-label-sm text-label-sm text-[#191c1e] bg-[#f2f4f6] px-2 py-1 rounded">
                • Domicile: Mandatory
              </div>
            </div>
          </div>

          {/* Dept 2 */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-[#e6e8ea]">
            <div className="flex items-center gap-1.5 mb-1.5 text-[#3755c3]">
              <span className="material-symbols-outlined text-[20px]">groups</span>
              <span className="font-label-md text-label-md font-bold">Social Justice &amp; Assistance</span>
            </div>
            <p className="font-body-sm text-body-sm text-[#44474d] mb-3">
              Post-Matric Scholarship for SC and Navabuddha students, maintenance allowance for professional institutions.
            </p>
            <div className="space-y-1">
              <div className="font-label-sm text-label-sm text-[#191c1e] bg-[#f2f4f6] px-2 py-1 rounded">
                • Caste Validity: Mandatory
              </div>
              <div className="font-label-sm text-label-sm text-[#191c1e] bg-[#f2f4f6] px-2 py-1 rounded">
                • Form 16 / Income Proof
              </div>
            </div>
          </div>

          {/* Dept 3 */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-[#e6e8ea]">
            <div className="flex items-center gap-1.5 mb-1.5 text-[#3755c3]">
              <span className="material-symbols-outlined text-[20px]">nature_people</span>
              <span className="font-label-md text-label-md font-bold">Tribal Development Dept</span>
            </div>
            <p className="font-body-sm text-body-sm text-[#44474d] mb-3">
              Post-Matric Scholarship Scheme (Government of India) &amp; Tuition and Examination Fee Waiver for ST students.
            </p>
            <div className="space-y-1">
              <div className="font-label-sm text-label-sm text-[#191c1e] bg-[#f2f4f6] px-2 py-1 rounded">
                • Tribe Certificate &amp; Scrutiny
              </div>
              <div className="font-label-sm text-label-sm text-[#191c1e] bg-[#f2f4f6] px-2 py-1 rounded">
                • Hosteller Allowance Audit
              </div>
            </div>
          </div>

          {/* Dept 4 */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-[#e6e8ea]">
            <div className="flex items-center gap-1.5 mb-1.5 text-[#3755c3]">
              <span className="material-symbols-outlined text-[20px]">hub</span>
              <span className="font-label-md text-label-md font-bold">VJNT, OBC &amp; SBC Welfare</span>
            </div>
            <p className="font-body-sm text-body-sm text-[#44474d] mb-3">
              Post Matric Scholarship for OBC/VJNT/SBC students, including Non-Creamy Layer document validation algorithms.
            </p>
            <div className="space-y-1">
              <div className="font-label-sm text-label-sm text-[#191c1e] bg-[#f2f4f6] px-2 py-1 rounded">
                • Non-Creamy Layer Validity Check
              </div>
              <div className="font-label-sm text-label-sm text-[#191c1e] bg-[#f2f4f6] px-2 py-1 rounded">
                • Ration Card / Family Tree Check
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Document Preview & Inspection Sample */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10 items-center">
        <div className="lg:col-span-5 flex flex-col gap-2">
          <span className="font-label-md text-label-md uppercase tracking-wider text-[#3755c3] font-semibold">
            Field Level Precision
          </span>
          <h2 className="font-headline-lg text-headline-lg text-[#000412] font-bold">
            Smart Analysis of Official Maharashtra Certificates
          </h2>
          <p className="font-body-md text-body-md text-[#44474d] leading-relaxed">
            Our scanner recognizes typical seal placements, 16-digit barcoded certificate IDs from MahaOnline, Tahsil signatures, and validity date formats from all 36 districts of Maharashtra.
          </p>
          <div className="space-y-2 mt-2">
            <div className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-xs border border-[#e6e8ea]">
              <span className="material-symbols-outlined text-[#13968a] mt-0.5">task_alt</span>
              <div>
                <span className="font-label-md text-label-md text-[#191c1e] font-semibold">
                  Validates 1-Year vs 3-Year Income Certificate Rules
                </span>
                <p className="font-body-sm text-body-sm text-[#44474d]">
                  Detects whether your certificate covers the mandatory preceding financial year or has expired.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-xs border border-[#e6e8ea]">
              <span className="material-symbols-outlined text-[#13968a] mt-0.5">task_alt</span>
              <div>
                <span className="font-label-md text-label-md text-[#191c1e] font-semibold">
                  Cross-checks Aadhaar Seeded Bank Account Status
                </span>
                <p className="font-body-sm text-body-sm text-[#44474d]">
                  Reminds you to confirm NPCI mapping before relying on DBT scholarship payouts.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="w-full bg-white rounded-xl p-6 shadow-md border border-[#c5c6ce]">
            <div className="flex items-center justify-between pb-4 border-b border-[#eceef0]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#3755c3]">visibility</span>
                <span className="font-label-md text-label-md text-[#191c1e] font-semibold">
                  Tahsildar Certificate Inspection Sample
                </span>
              </div>
              <span className="font-label-sm text-label-sm text-[#44474d] bg-[#f2f4f6] px-2 py-0.5 rounded">
                Sample: Haveli, Pune
              </span>
            </div>

            <div className="bg-[#f2f4f6] rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <div>
                  <span className="font-label-sm text-label-sm text-[#44474d] block">Parsed Certificate Holder</span>
                  <div className="font-label-md text-label-md text-[#191c1e] bg-white p-1.5 rounded border border-[#e6e8ea]">
                    Deshmukh Aarav Suresh
                  </div>
                </div>
                <div>
                  <span className="font-label-sm text-label-sm text-[#44474d] block">Annual Family Income</span>
                  <div className="font-label-md text-label-md text-[#191c1e] bg-white p-1.5 rounded font-mono border border-[#e6e8ea]">
                    ₹ 1,80,000 /- (One Lakh Eighty Thousand)
                  </div>
                </div>
                <div>
                  <span className="font-label-sm text-label-sm text-[#44474d] block">Issuing Authority</span>
                  <div className="font-label-md text-label-md text-[#191c1e] bg-white p-1.5 rounded border border-[#e6e8ea]">
                    Tahsildar Haveli, Pune District
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <span className="font-label-sm text-label-sm text-[#44474d] block">Application Barcode ID</span>
                  <div className="font-label-md text-label-md text-[#191c1e] bg-white p-1.5 rounded font-mono border border-[#e6e8ea]">
                    MH-PUN-2023-98214
                  </div>
                </div>
                <div>
                  <span className="font-label-sm text-label-sm text-[#44474d] block">Financial Validity Range</span>
                  <div className="font-label-md text-label-md text-[#13968a] bg-white p-1.5 rounded font-semibold border border-[#e6e8ea]">
                    Valid through 31-03-2025 (Active)
                  </div>
                </div>
                <div>
                  <span className="font-label-sm text-label-sm text-[#44474d] block">MahaDBT Eligibility Status</span>
                  <div className="font-label-md text-label-md text-[#3755c3] bg-white p-1.5 rounded font-semibold border border-[#e6e8ea]">
                    Under EBC / Freeship Threshold (&lt; 8L)
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-[#44474d]">
                <span className="material-symbols-outlined text-[16px]">info</span>
                <span className="font-body-sm text-body-sm">
                  Matches standard Aaple Sarkar digital signature stamp formats.
                </span>
              </div>
              <button
                onClick={onOpenRules}
                className="px-4 py-1.5 rounded-lg bg-[#eceef0] text-[#191c1e] hover:bg-[#e6e8ea] transition-colors font-label-sm text-label-sm font-semibold cursor-pointer"
                type="button"
              >
                View Certificate Rules
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Frequently Asked Questions (Accordion) */}
      <section className="mb-10">
        <div className="flex flex-col mb-4">
          <span className="font-label-md text-label-md uppercase tracking-wider text-[#3755c3] font-semibold">
            Common Inquiries
          </span>
          <h2 className="font-headline-lg text-headline-lg text-[#000412] font-bold">
            Frequently Asked Questions
          </h2>
          <p className="font-body-md text-body-md text-[#44474d]">
            Clear answers regarding data privacy, regulatory positioning, and document remediation.
          </p>
        </div>

        <div className="space-y-3 max-w-4xl">
          {/* FAQ 1 */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e6e8ea] transition-all">
            <button
              className="w-full flex items-center justify-between text-left focus:outline-none cursor-pointer"
              onClick={() => toggleFaq(0)}
              type="button"
            >
              <span className="font-headline-sm text-headline-sm text-[#000412] font-medium text-base sm:text-lg">
                Does MahaScholar Guard submit my application to MahaDBT or colleges?
              </span>
              <span
                className={`material-symbols-outlined text-[#3755c3] transition-transform ${
                  openFaq === 0 ? 'rotate-180' : ''
                }`}
              >
                expand_more
              </span>
            </button>
            {openFaq === 0 && (
              <div className="pt-3 text-[#44474d] font-body-md text-body-md leading-relaxed border-t border-[#eceef0] mt-3">
                <p>
                  <strong>No.</strong> MahaScholar Guard is solely a pre-submission advisory tool. It does not interface directly with the MahaDBT servers to submit or alter official applications. You must always upload your verified documents independently on the official government website (mahadbt.maharashtra.gov.in) before the official departmental deadlines.
                </p>
              </div>
            )}
          </div>

          {/* FAQ 2 */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e6e8ea] transition-all">
            <button
              className="w-full flex items-center justify-between text-left focus:outline-none cursor-pointer"
              onClick={() => toggleFaq(1)}
              type="button"
            >
              <span className="font-headline-sm text-headline-sm text-[#000412] font-medium text-base sm:text-lg">
                Are my sensitive documents stored or logged on public servers?
              </span>
              <span
                className={`material-symbols-outlined text-[#3755c3] transition-transform ${
                  openFaq === 1 ? 'rotate-180' : ''
                }`}
              >
                expand_more
              </span>
            </button>
            {openFaq === 1 && (
              <div className="pt-3 text-[#44474d] font-body-md text-body-md leading-relaxed border-t border-[#eceef0] mt-3">
                <p>
                  <strong>Never.</strong> MahaScholar Guard uses a zero-retention architecture. Your documents are inspected temporarily in browser memory or stateless isolated sessions for OCR/heuristic analysis. Once your session ends or you download your audit report, uploaded files are completely destroyed.
                </p>
              </div>
            )}
          </div>

          {/* FAQ 3 */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e6e8ea] transition-all">
            <button
              className="w-full flex items-center justify-between text-left focus:outline-none cursor-pointer"
              onClick={() => toggleFaq(2)}
              type="button"
            >
              <span className="font-headline-sm text-headline-sm text-[#000412] font-medium text-base sm:text-lg">
                What if my name differs slightly between my Aadhaar and Marksheet?
              </span>
              <span
                className={`material-symbols-outlined text-[#3755c3] transition-transform ${
                  openFaq === 2 ? 'rotate-180' : ''
                }`}
              >
                expand_more
              </span>
            </button>
            {openFaq === 2 && (
              <div className="pt-3 text-[#44474d] font-body-md text-body-md leading-relaxed border-t border-[#eceef0] mt-3">
                <p>
                  Minor spelling variations or differences in the order of initials (e.g., Surname first vs. First name first) are among the most common reasons for scrutiny hold-ups at the college level. MahaScholar Guard flags these differences and generates the standard Maharashtra Government Affidavit template format required to resolve discrepancies.
                </p>
              </div>
            )}
          </div>

          {/* FAQ 4 */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e6e8ea] transition-all">
            <button
              className="w-full flex items-center justify-between text-left focus:outline-none cursor-pointer"
              onClick={() => toggleFaq(3)}
              type="button"
            >
              <span className="font-headline-sm text-headline-sm text-[#000412] font-medium text-base sm:text-lg">
                Is this service really free for college students?
              </span>
              <span
                className={`material-symbols-outlined text-[#3755c3] transition-transform ${
                  openFaq === 3 ? 'rotate-180' : ''
                }`}
              >
                expand_more
              </span>
            </button>
            {openFaq === 3 && (
              <div className="pt-3 text-[#44474d] font-body-md text-body-md leading-relaxed border-t border-[#eceef0] mt-3">
                <p>
                  Yes. MahaScholar Guard operates as an open-access civic-tech guidance resource developed to reduce clerical barriers for economically backward, reserved category, and first-generation college students across Maharashtra.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 7. Bottom Action CTA */}
      <section className="w-full bg-[#0f1e36] text-white rounded-xl p-6 md:p-10 shadow-xl mb-6 relative overflow-hidden">
        <div className="max-w-2xl flex flex-col gap-2 relative z-10">
          <span className="font-label-md text-label-md uppercase tracking-wider text-[#708cfd] font-semibold">
            Start Your 2-Minute Audit
          </span>
          <h2 className="font-headline-lg text-headline-lg font-bold text-white">
            Check Your Scholarship Dossier Before You Submit to MahaDBT
          </h2>
          <p className="font-body-md text-body-md text-[#b8c7e6] leading-relaxed">
            Don&apos;t risk waiting months for clerical corrections. Validate all required certificates, names, and validity dates right now in private.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <button
              onClick={() => onNavigate('upload-wizard')}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#3755c3] text-white font-label-lg text-label-lg hover:bg-[#173bab] transition-all shadow-md cursor-pointer"
              type="button"
            >
              <span>Launch Readiness Assistant</span>
              <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
            </button>

            <button
              onClick={() => onNavigate('scheme-selection')}
              className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all font-label-md text-label-md cursor-pointer"
              type="button"
            >
              <span>Browse 24 Scheme Checklists</span>
            </button>
          </div>
        </div>

        {/* Subtle Background Graphic Accent */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-[#3755c3]/20 blur-3xl pointer-events-none"></div>
      </section>
    </div>
  );
};
