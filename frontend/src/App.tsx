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
import { t } from './i18n';

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
  generateAuditReport,
  createUploadedDocRecord,
} from './services/scholarshipService';

const LANGUAGE_STORAGE_KEY = 'mahascholar_language';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved === 'mr' || saved === 'en') {
        return saved;
      }
    } catch {
      // LocalStorage access may fail in private browsing
    }
    return 'en';
  });

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
  const [privacyModalType, setPrivacyModalType] = useState<'privacy' | 'safety'>('privacy');

  // Scroll to top on screen navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScreen]);

  const handleToggleLanguage = () => {
    setLanguage((prev) => {
      const next: Language = prev === 'en' ? 'mr' : 'en';
      try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
      } catch {
        // LocalStorage access may fail
      }
      return next;
    });
  };

  const handleSelectScheme = (scheme: ScholarshipScheme) => {
    setSelectedScheme(scheme);
    setReportData((prev) => generateAuditReport(scheme, uploadedDocs, extractedFields, prev));
  };

  const handleUpdateUploadedDocs = (docs: Record<string, UploadedDocRecord>) => {
    setUploadedDocs(docs);
    setReportData((prev) => generateAuditReport(selectedScheme, docs, extractedFields, prev));
  };

  const handleUpdateFields = (fields: ExtractedField[]) => {
    setExtractedFields(fields);
    setReportData((prev) => generateAuditReport(selectedScheme, uploadedDocs, fields, prev));
  };

  const handleFastTrackUpload = (docCode: string, file: File) => {
    const record = createUploadedDocRecord(docCode, file);
    const updatedDocs = { ...uploadedDocs, [docCode]: record };
    setUploadedDocs(updatedDocs);
    setReportData((prev) => generateAuditReport(selectedScheme, updatedDocs, extractedFields, prev));
  };

  const handleSaveCandidateName = (newName: string) => {
    const updatedFields = extractedFields.map((f) =>
      f.key === 'studentNameMarksheet' ? { ...f, value: newName, status: 'clean' as const } : f
    );
    setExtractedFields(updatedFields);
    setReportData((prev) => {
      const regenerated = generateAuditReport(selectedScheme, uploadedDocs, updatedFields, prev);
      return {
        ...regenerated,
        studentName: newName,
      };
    });
  };

  const privacyTitle = privacyModalType === 'privacy'
    ? (language === 'mr' ? 'महास्कॉलर गार्ड गोपनीयता निर्देश' : 'MahaScholar Guard Privacy Directive')
    : (language === 'mr' ? 'कागदपत्र सुरक्षा व संचयन मानक' : 'Ephemeral Document Safety Standard');

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
              onSelectScheme={handleSelectScheme}
            />
          )}

          {currentScreen === 'upload-wizard' && (
            <UploadWizardScreen
              onNavigate={setCurrentScreen}
              language={language}
              selectedScheme={selectedScheme}
              uploadedDocs={uploadedDocs}
              onUpdateUploadedDocs={handleUpdateUploadedDocs}
            />
          )}

          {currentScreen === 'document-review' && (
            <DocumentReviewScreen
              onNavigate={setCurrentScreen}
              language={language}
              extractedFields={extractedFields}
              onUpdateFields={handleUpdateFields}
            />
          )}

          {currentScreen === 'readiness-report' && (
            <ReadinessReportScreen
              onNavigate={setCurrentScreen}
              language={language}
              reportData={reportData}
              onUpdateReportData={setReportData}
              onOpenEditRecordModal={() => setIsEditRecordOpen(true)}
              onFastTrackUpload={handleFastTrackUpload}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer
        language={language}
        onOpenPrivacyModal={() => {
          setPrivacyModalType('privacy');
          setIsPrivacyModalOpen(true);
        }}
        onOpenSafetyModal={() => {
          setPrivacyModalType('safety');
          setIsPrivacyModalOpen(true);
        }}
      />

      {/* Modals */}
      <WalkthroughModal
        isOpen={isWalkthroughOpen}
        onClose={() => setIsWalkthroughOpen(false)}
        onStartAudit={() => setCurrentScreen('upload-wizard')}
        language={language}
      />

      <CertificateRulesModal
        isOpen={isRulesOpen}
        onClose={() => setIsRulesOpen(false)}
        language={language}
      />

      <EditRecordModal
        isOpen={isEditRecordOpen}
        onClose={() => setIsEditRecordOpen(false)}
        reportData={reportData}
        onSaveCandidateName={handleSaveCandidateName}
        language={language}
      />

      <PrivacyDirectiveModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        title={privacyTitle}
        language={language}
      />
    </div>
  );
}
