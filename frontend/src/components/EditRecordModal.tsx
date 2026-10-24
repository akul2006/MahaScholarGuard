import React, { useState } from 'react';
import { AuditReportData } from '../types';

interface EditRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportData: AuditReportData;
  onSaveCandidateName: (newName: string) => void;
}

export const EditRecordModal: React.FC<EditRecordModalProps> = ({
  isOpen,
  onClose,
  reportData,
  onSaveCandidateName,
}) => {
  const [candidateName, setCandidateName] = useState(reportData.studentName);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveCandidateName(candidateName);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#c5c6ce] flex flex-col">
        <div className="flex items-center justify-between pb-4 border-b border-[#eceef0]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#3755c3] text-[22px]">edit</span>
            <h3 className="font-headline-sm text-headline-sm text-[#000412] font-bold text-base">
              Edit Candidate Identity Record
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#75777e] hover:bg-[#eceef0]"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="py-4 space-y-4 text-xs">
          <div>
            <label className="font-semibold text-[#191c1e] block mb-1">
              Candidate Legal Name (as per SSC / Board Records)
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 bg-[#f2f4f6] rounded-lg border border-[#c5c6ce] font-mono text-xs font-semibold text-[#000412] focus:bg-white focus:outline-none focus:border-[#3755c3]"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
            />
            <span className="text-[11px] text-[#75777e] mt-1 block">
              Ensure this matches your Board Qualifying Exam Passing Certificate.
            </span>
          </div>

          <div className="p-3 rounded-lg bg-[#f2f4f6] border border-[#e6e8ea]">
            <span className="font-semibold text-[#000412] block mb-1">Aadhaar Format Comparison:</span>
            <div className="font-mono text-[#44474d]">Aadhaar UID: DESHMUKH AARAV RAMESH</div>
            <div className="font-mono text-[#ba1a1a] mt-0.5">Board Marksheet: DESHMUKH AARAV R.</div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#eceef0] flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#eceef0] text-[#191c1e] text-xs font-semibold hover:bg-[#e6e8ea]"
            type="button"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-[#0f1e36] text-white text-xs font-semibold hover:bg-[#3755c3]"
            type="button"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
