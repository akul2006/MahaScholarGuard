/**
 * MahaScholar Guard - Main Application Root
 * Preserves Google Stitch visual identity, typography, tokens and layout.
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WalkthroughModal } from './components/WalkthroughModal';
import { CertificateRulesModal } from './components/CertificateRulesModal';
import { EditRecordModal } from './components/EditRecordModal';
import { PrivacyDirectiveModal } from './components/PrivacyDirectiveModal';

import { LandingScreen } from './screens/LandingScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { SchemeSelectionScreen } from './screens/SchemeSelectionScreen';
import { UploadWizardScreen } from './screens/UploadWizardScreen';
import { DocumentReviewScreen } from './screens/DocumentReviewScreen';
import { ReadinessReportScreen } from './screens/ReadinessReportScreen';

import {
  ScreenId,
  Language,
  ScholarshipScheme,
  UploadedDocRecord,
  ExtractedField,
  AuditReportData,
} from './types';
import {
  MOCK_SCHEMES,
  INITIAL_EXTRACTED_FIELDS,
  INITIAL_AUDIT_REPORT,
} from './services/scholarshipService';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [language, setLanguage] = useState<Language>('en');

  // Selected scholarship scheme (defaults to Rajarshi Shahu EBC)
  const [selectedScheme, setSelectedScheme] = useState<ScholarshipScheme>(MOCK_SCHEMES[0]);

  // Uploaded docs in memory
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, UploadedDocRecord>>({});

  // Extracted fields
  const [extractedFields, setExtractedFields] = useState<ExtractedField[]>(INITIAL_EXTRACTED_FIELDS);

  // Audit report data
  const [reportData, setReportData] = useState<AuditReportData>(INITIAL_AUDIT_REPORT);

  // Modals state
  const [isWalkthroughOpen, setIsWalkthroughOpen] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [isEditRecordOpen, setIsEditRecordOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [privacyModalTitle, setPrivacyModalTitle] = useState('Privacy Directive');

  // Scroll to top on screen navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScreen]);

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'mr' : 'en'));
  };

  const handleSaveCandidateName = (newName: string) => {
    setReportData((prev) => ({
      ...prev,
      studentName: newName,
    }));
    // Also update in extracted fields
    setExtractedFields((prev) =>
      prev.map((f) => (f.key === 'studentNameMarksheet' ? { ...f, value: newName } : f))
    );
  };

  return (
    <div className="bg-[#f7f9fb] text-[#191c1e] min-h-screen flex flex-col antialiased">
      {/* Top Fixed Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        language={language}
        onToggleLanguage={handleToggleLanguage}
      />

      {/* Main Screen Content */}
      <main className="w-full pt-20 bg-[#f7f9fb] flex-1">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-6">
          {currentScreen === 'home' && (
            <LandingScreen
              onNavigate={setCurrentScreen}
              language={language}
              onOpenWalkthrough={() => setIsWalkthroughOpen(true)}
              onOpenRules={() => setIsRulesOpen(true)}
            />
          )}

          {currentScreen === 'dashboard' && (
            <DashboardScreen
              onNavigate={setCurrentScreen}
              language={language}
              reportData={reportData}
            />
          )}

          {currentScreen === 'scheme-selection' && (
            <SchemeSelectionScreen
              onNavigate={setCurrentScreen}
              language={language}
              selectedSchemeId={selectedScheme.id}
              onSelectScheme={(scheme) => {
                setSelectedScheme(scheme);
                setReportData((prev) => ({
                  ...prev,
                  schemeId: scheme.id,
                  schemeNameEn: scheme.nameEn,
                  departmentNameEn: scheme.departmentEn,
                }));
              }}
            />
          )}

          {currentScreen === 'upload-wizard' && (
            <UploadWizardScreen
              onNavigate={setCurrentScreen}
              language={language}
              selectedScheme={selectedScheme}
              uploadedDocs={uploadedDocs}
              onUpdateUploadedDocs={setUploadedDocs}
            />
          )}

          {currentScreen === 'document-review' && (
            <DocumentReviewScreen
              onNavigate={setCurrentScreen}
              language={language}
              extractedFields={extractedFields}
              onUpdateFields={setExtractedFields}
            />
          )}

          {currentScreen === 'readiness-report' && (
            <ReadinessReportScreen
              onNavigate={setCurrentScreen}
              language={language}
              reportData={reportData}
              onUpdateReportData={setReportData}
              onOpenEditRecordModal={() => setIsEditRecordOpen(true)}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer
        language={language}
        onOpenPrivacyModal={() => {
          setPrivacyModalTitle('MahaScholar Guard Privacy Directive');
          setIsPrivacyModalOpen(true);
        }}
        onOpenSafetyModal={() => {
          setPrivacyModalTitle('Ephemeral Document Safety Standard');
          setIsPrivacyModalOpen(true);
        }}
      />

      {/* Modals */}
      <WalkthroughModal
        isOpen={isWalkthroughOpen}
        onClose={() => setIsWalkthroughOpen(false)}
        onStartAudit={() => setCurrentScreen('upload-wizard')}
      />

      <CertificateRulesModal
        isOpen={isRulesOpen}
        onClose={() => setIsRulesOpen(false)}
      />

      <EditRecordModal
        isOpen={isEditRecordOpen}
        onClose={() => setIsEditRecordOpen(false)}
        reportData={reportData}
        onSaveCandidateName={handleSaveCandidateName}
      />

      <PrivacyDirectiveModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        title={privacyModalTitle}
      />
    </div>
  );
}
