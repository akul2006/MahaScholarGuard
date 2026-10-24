import React, { useState } from 'react';
import { StatutoryBanner } from '../components/StatutoryBanner';
import { ScreenId, Language, ScholarshipScheme, UploadedDocRecord } from '../types';

interface UploadWizardScreenProps {
  onNavigate: (screen: ScreenId) => void;
  language: Language;
  selectedScheme: ScholarshipScheme;
  uploadedDocs: Record<string, UploadedDocRecord>;
  onUpdateUploadedDocs: (docs: Record<string, UploadedDocRecord>) => void;
}

export const UploadWizardScreen: React.FC<UploadWizardScreenProps> = ({
  onNavigate,
  language,
  selectedScheme,
  uploadedDocs,
  onUpdateUploadedDocs,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // File size validation (MahaDBT requires 100 KB - 256 KB)
  const MIN_SIZE_KB = 50;
  const MAX_SIZE_KB = 350;

  const handleFileUpload = (docCode: string, file: File) => {
    setErrorMessage(null);
    const sizeKb = file.size / 1024;

    // Check extension
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    const validExtensions = ['.pdf', '.jpg', '.jpeg', '.png'];
    if (!validExtensions.includes(extension)) {
      setErrorMessage(`Invalid file format "${extension}". Only PDF, JPG, and PNG are supported.`);
      return;
    }

    if (sizeKb > MAX_SIZE_KB) {
      setErrorMessage(`File is too large (${sizeKb.toFixed(0)} KB). MahaDBT limit is 256 KB.`);
      return;
    }

    const newRecord: UploadedDocRecord = {
      id: `doc-${Date.now()}`,
      docCode,
      fileName: file.name,
      fileSizeKb: Math.round(sizeKb),
      fileType: file.type || 'application/pdf',
      uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSimulated: false,
      status: 'ready',
    };

    onUpdateUploadedDocs({
      ...uploadedDocs,
      [docCode]: newRecord,
    });
  };

  const handleRemoveDoc = (docCode: string) => {
    const copy = { ...uploadedDocs };
    delete copy[docCode];
    onUpdateUploadedDocs(copy);
  };

  // One-click demo dossier loader (Loads Aarav Deshmukh's documents with Income intentionally missing to showcase the 78% audit state!)
  const handleLoadSampleDossier = () => {
    setErrorMessage(null);
    const sampleDossier: Record<string, UploadedDocRecord> = {
      DOMICILE_CERT: {
        id: 'sample-dom-01',
        docCode: 'DOMICILE_CERT',
        fileName: 'Aarav_Deshmukh_Domicile_FormC.pdf',
        fileSizeKb: 184,
        fileType: 'application/pdf',
        uploadedAt: '11:38 IST',
        isSimulated: true,
        status: 'ready',
      },
      HSC_MARKSHEET: {
        id: 'sample-hsc-02',
        docCode: 'HSC_MARKSHEET',
        fileName: 'Maharashtra_HSC_Board_Class12_Marksheet.pdf',
        fileSizeKb: 215,
        fileType: 'application/pdf',
        uploadedAt: '11:39 IST',
        isSimulated: true,
        status: 'ready',
      },
      COLLEGE_BONAFIDE: {
        id: 'sample-bonafide-03',
        docCode: 'COLLEGE_BONAFIDE',
        fileName: 'COEP_Pune_Admission_Fee_Receipt_2024.pdf',
        fileSizeKb: 142,
        fileType: 'application/pdf',
        uploadedAt: '11:40 IST',
        isSimulated: true,
        status: 'ready',
      },
      RATION_CARD: {
        id: 'sample-ration-04',
        docCode: 'RATION_CARD',
        fileName: 'Maharashtra_Smart_Ration_Card_Family_Tree.pdf',
        fileSizeKb: 168,
        fileType: 'application/pdf',
        uploadedAt: '11:41 IST',
        isSimulated: true,
        status: 'ready',
      },
      AADHAAR_CARD: {
        id: 'sample-aadhaar-05',
        docCode: 'AADHAAR_CARD',
        fileName: 'Aadhaar_UIDAI_Masked_Digital_Copy.pdf',
        fileSizeKb: 195,
        fileType: 'application/pdf',
        uploadedAt: '11:41 IST',
        isSimulated: true,
        status: 'ready',
      },
      // Note: INCOME_CERT is left un-uploaded initially so students see the real 1-Critical Missing item flow!
    };

    onUpdateUploadedDocs(sampleDossier);
  };

  const uploadedCount = Object.keys(uploadedDocs).length;
  const totalRequired = selectedScheme.requiredDocuments.length;

  return (
    <div className="flex flex-col w-full">
      {/* Regulatory Banner */}
      <StatutoryBanner language={language} />

      {/* Screen Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 text-[#3755c3]">
            <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
            <span className="text-xs uppercase font-semibold tracking-wider">
              Step 02 of 04 • Document In-Memory Inspection
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-[#000412] font-bold">
            Upload Scholarship Documents
          </h1>
          <p className="font-body-md text-body-md text-[#44474d] mt-1">
            Auditing requirements for:{' '}
            <strong className="text-[#000412] font-semibold">{selectedScheme.nameEn}</strong>
          </p>
        </div>

        {/* Quick Demo Button */}
        <button
          onClick={handleLoadSampleDossier}
          className="self-start md:self-auto px-4 py-2 rounded-lg bg-[#dde1ff] text-[#001453] hover:bg-[#b8c4ff] text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">auto_fix_high</span>
          <span>Load Sample Student Dossier (Aarav Deshmukh)</span>
        </button>
      </div>

      {/* Error Alert if any */}
      {errorMessage && (
        <div className="bg-[#ffdad6] text-[#93000a] p-3 rounded-xl mb-4 text-xs font-medium flex items-center justify-between border border-[#ba1a1a]/30">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">error</span>
            <span>{errorMessage}</span>
          </div>
          <button
            onClick={() => setErrorMessage(null)}
            className="text-xs font-bold hover:underline"
            type="button"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Ephemeral Privacy Note */}
      <div className="bg-[#f2f4f6] rounded-xl p-4 border border-[#c5c6ce] mb-6 flex items-start gap-3">
        <span className="material-symbols-outlined text-[#13968a] text-[22px] shrink-0 mt-0.5">
          lock
        </span>
        <div className="flex flex-col text-xs text-[#44474d]">
          <span className="font-semibold text-[#000412]">
            Ephemeral In-Browser Processing (Zero Data Retention)
          </span>
          <p className="mt-0.5">
            Your certificates are inspected purely in client-side memory for schema and demographic verification. Files are never stored on external databases or sent to third parties.
          </p>
        </div>
      </div>

      {/* Document Upload Matrix */}
      <div className="space-y-4 mb-8">
        {selectedScheme.requiredDocuments.map((docSpec, index) => {
          const uploaded = uploadedDocs[docSpec.code];
          return (
            <div
              key={docSpec.code}
              className={`bg-white rounded-xl p-5 shadow-sm border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                uploaded
                  ? 'border-[#13968a]/50 bg-[#89f5e7]/5'
                  : docSpec.isMandatory
                  ? 'border-[#e6e8ea]'
                  : 'border-[#e6e8ea]'
              }`}
            >
              {/* Left Info */}
              <div className="flex items-start gap-3.5 flex-1">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                    uploaded
                      ? 'bg-[#89f5e7] text-[#13968a]'
                      : 'bg-[#eceef0] text-[#44474d]'
                  }`}
                >
                  {uploaded ? (
                    <span className="material-symbols-outlined text-[20px]">check</span>
                  ) : (
                    `0${index + 1}`
                  )}
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h3 className="font-label-lg text-label-lg text-[#000412] font-bold">
                      {language === 'mr' ? docSpec.nameMr : docSpec.nameEn}
                    </h3>
                    {docSpec.isMandatory ? (
                      <span className="bg-[#ffdad6] text-[#ba1a1a] text-[10px] font-bold px-1.5 py-0.5 rounded">
                        Mandatory
                      </span>
                    ) : (
                      <span className="bg-[#eceef0] text-[#44474d] text-[10px] px-1.5 py-0.5 rounded">
                        Optional
                      </span>
                    )}
                  </div>

                  <span className="text-xs text-[#3755c3] font-medium mt-0.5">
                    Issuing Authority: {docSpec.issuingAuthority}
                  </span>

                  <p className="text-xs text-[#44474d] mt-1 leading-relaxed">
                    {language === 'mr' ? docSpec.descriptionMr : docSpec.descriptionEn}
                  </p>

                  <span className="text-[11px] text-[#75777e] mt-1">
                    Rule: {docSpec.instructionsEn} • Specs: Max {docSpec.maxSizeKb} KB ({docSpec.allowedExtensions.join(', ')})
                  </span>
                </div>
              </div>

              {/* Right Action Dropzone / Status */}
              <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                {uploaded ? (
                  <div className="flex items-center gap-3 bg-white p-2.5 rounded-lg border border-[#c5c6ce] shadow-xs">
                    <span className="material-symbols-outlined text-[#13968a] text-[22px]">
                      description
                    </span>
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-semibold text-[#000412] truncate max-w-[180px]">
                        {uploaded.fileName}
                      </span>
                      <span className="text-[11px] text-[#44474d]">
                        {uploaded.fileSizeKb} KB • {uploaded.uploadedAt}
                      </span>
                    </div>
                    <button
                      onClick={() => handleRemoveDoc(docSpec.code)}
                      className="p-1 text-[#ba1a1a] hover:bg-[#ffdad6] rounded transition-colors"
                      title="Remove document"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                ) : (
                  <label className="px-4 py-2.5 rounded-lg bg-[#eceef0] hover:bg-[#e6e8ea] text-[#191c1e] text-xs font-semibold flex items-center gap-1.5 cursor-pointer border border-[#c5c6ce] transition-colors">
                    <span className="material-symbols-outlined text-[18px] text-[#3755c3]">
                      upload_file
                    </span>
                    <span>Upload File</span>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileUpload(docSpec.code, e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress & Navigation Bar */}
      <div className="bg-white p-4 rounded-xl shadow-md border border-[#c5c6ce] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-[#191c1e]">
            {uploadedCount} of {totalRequired} Documents Attached
          </span>
          <div className="w-32 bg-[#e6e8ea] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#3755c3] h-2 rounded-full transition-all"
              style={{ width: `${Math.round((uploadedCount / totalRequired) * 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => onNavigate('scheme-selection')}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg bg-[#eceef0] text-[#191c1e] text-xs font-semibold hover:bg-[#e6e8ea] cursor-pointer"
            type="button"
          >
            Back to Schemes
          </button>
          <button
            onClick={() => onNavigate('document-review')}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg bg-[#0f1e36] text-white text-xs font-semibold hover:bg-[#3755c3] transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
            type="button"
          >
            <span>Proceed to OCR Extracted Data Review</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
