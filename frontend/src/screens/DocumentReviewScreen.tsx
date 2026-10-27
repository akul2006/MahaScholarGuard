import React, { useState } from 'react';
import { StatutoryBanner } from '../components/StatutoryBanner';
import { ScreenId, Language, ExtractedField } from '../types';
import { t } from '../i18n';

interface DocumentReviewScreenProps {
  onNavigate: (screen: ScreenId) => void;
  language: Language;
  extractedFields: ExtractedField[];
  onUpdateFields: (fields: ExtractedField[]) => void;
}

export const DocumentReviewScreen: React.FC<DocumentReviewScreenProps> = ({
  onNavigate,
  language,
  extractedFields,
  onUpdateFields,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<string>('');
  const [successToast, setSuccessToast] = useState(false);

  const startEdit = (field: ExtractedField) => {
    setEditingId(field.id);
    setTempValue(field.value);
  };

  const saveEdit = (fieldId: string) => {
    const updated = extractedFields.map((f) => {
      if (f.id === fieldId) {
        return {
          ...f,
          value: tempValue,
          status: 'clean' as const,
          note: language === 'mr' ? 'विद्यार्थ्याने व्यक्तिशः पडताळून निश्चित केले.' : 'Manually verified and confirmed by student.',
        };
      }
      return f;
    });
    onUpdateFields(updated);
    setEditingId(null);
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 2500);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-24 right-6 z-50 bg-[#13968a] text-white px-4 py-2.5 rounded-lg shadow-xl text-xs font-semibold flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>{t('reviewToast', language)}</span>
        </div>
      )}

      {/* Regulatory Banner */}
      <StatutoryBanner language={language} />

      {/* Screen Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 text-[#3755c3]">
            <span className="material-symbols-outlined text-[18px]">fact_check</span>
            <span className="text-xs uppercase font-semibold tracking-wider">
              {t('reviewStepLabel', language)}
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-[#000412] font-bold">
            {t('reviewTitle', language)}
          </h1>
          <p className="font-body-md text-body-md text-[#44474d] mt-1">
            {t('reviewSubtext', language)}
          </p>
        </div>

        <button
          onClick={() => onNavigate('readiness-report')}
          className="self-start md:self-auto px-5 py-2.5 rounded-lg bg-[#0f1e36] text-white text-xs font-semibold hover:bg-[#3755c3] flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          type="button"
        >
          <span>{t('reviewGenerateBtn', language)}</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>

      {/* Backend & Simulated Data Clarification Banner */}
      <div className="bg-[#dde1ff]/40 rounded-xl p-4 border border-[#dde1ff] mb-6 flex items-start gap-3">
        <span className="material-symbols-outlined text-[#173bab] text-[22px] shrink-0 mt-0.5">
          smart_toy
        </span>
        <div className="flex flex-col text-xs text-[#44474d]">
          <span className="font-semibold text-[#173bab]">
            {t('reviewSimOCRTitle', language)}
          </span>
          <p className="mt-0.5">
            {t('reviewSimOCRBody', language)}
          </p>
        </div>
      </div>

      {/* Extracted Fields Table / Cards */}
      <div className="bg-white rounded-xl shadow-sm border border-[#e6e8ea] overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-[#eceef0] flex items-center justify-between">
          <h2 className="font-headline-sm text-headline-sm text-[#000412] font-bold text-base">
            {t('reviewTableTitle', language)}
          </h2>
          <span className="text-xs text-[#44474d] bg-[#f2f4f6] px-2.5 py-1 rounded font-medium">
            {extractedFields.length} {t('reviewTrackedLabel', language)}
          </span>
        </div>

        <div className="divide-y divide-[#eceef0]">
          {extractedFields.map((field) => {
            const isEditing = editingId === field.id;
            return (
              <div
                key={field.id}
                className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#f7f9fb] transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-label-md text-label-md text-[#000412] font-bold">
                      {language === 'mr' ? field.labelMr : field.labelEn}
                    </span>
                    {field.status === 'mismatch' && (
                      <span className="bg-[#dde1ff] text-[#001453] text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {t('reviewVariationBadge', language)}
                      </span>
                    )}
                    {field.status === 'unverified' && (
                      <span className="bg-[#ffdad6] text-[#ba1a1a] text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {t('reviewPendingBadge', language)}
                      </span>
                    )}
                    {field.status === 'clean' && (
                      <span className="bg-[#89f5e7] text-[#13968a] text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {t('reviewCleanBadge', language)}
                      </span>
                    )}
                  </div>

                  {isEditing ? (
                    <div className="flex items-center gap-2 mt-2 max-w-md">
                      <input
                        type="text"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="flex-1 px-3 py-1.5 bg-[#f2f4f6] border border-[#3755c3] rounded-lg text-xs text-[#000412] font-mono font-semibold focus:outline-none"
                      />
                      <button
                        onClick={() => saveEdit(field.id)}
                        className="px-3 py-1.5 bg-[#0f1e36] text-white rounded-lg text-xs font-semibold hover:bg-[#3755c3] cursor-pointer"
                        type="button"
                      >
                        {t('reviewSaveBtn', language)}
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-2.5 py-1.5 bg-[#eceef0] text-[#44474d] rounded-lg text-xs hover:bg-[#e6e8ea] cursor-pointer"
                        type="button"
                      >
                        {t('reviewCancelBtn', language)}
                      </button>
                    </div>
                  ) : (
                    <div className="text-sm font-mono font-bold text-[#000412] mt-0.5">
                      {field.value}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-[#44474d]">
                    <span className="text-[#3755c3] font-medium">{t('reviewSourceLabel', language)} {field.sourceDoc}</span>
                    {field.note && <span>• {field.note}</span>}
                  </div>
                </div>

                {!isEditing && (
                  <button
                    onClick={() => startEdit(field)}
                    className="self-end md:self-center px-3 py-1.5 rounded-lg bg-[#eceef0] text-[#191c1e] text-xs font-semibold hover:bg-[#e6e8ea] flex items-center gap-1 cursor-pointer transition-colors"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                    <span>{t('reviewEditBtn', language)}</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="bg-white p-4 rounded-xl shadow-md border border-[#c5c6ce] flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={() => onNavigate('upload-wizard')}
          className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg bg-[#eceef0] text-[#191c1e] text-xs font-semibold hover:bg-[#e6e8ea] flex items-center justify-center gap-1 cursor-pointer"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>{t('reviewBackBtn', language)}</span>
        </button>

        <button
          onClick={() => onNavigate('readiness-report')}
          className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg bg-[#3755c3] text-white text-xs font-semibold hover:bg-[#173bab] flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
          type="button"
        >
          <span>{t('reviewRunAuditBtn', language)}</span>
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
        </button>
      </div>
    </div>
  );
};
