/**
 * MahaScholar Guard - Types & Interfaces
 * Domain types for Maharashtra scholarship preparation and document readiness audits.
 */

export type ScreenId =
  | 'home'
  | 'dashboard'
  | 'scheme-selection'
  | 'upload-wizard'
  | 'document-review'
  | 'readiness-report';

export type Language = 'en' | 'mr';

export type FindingStatus = 'missing' | 'review' | 'verified';

export interface ExtractedField {
  id: string;
  key: string;
  labelEn: string;
  labelMr: string;
  value: string;
  sourceDoc: string;
  sourceDocCode?: string;
  status: 'clean' | 'mismatch' | 'unverified';
  note?: string;
  suggestedValue?: string;
}

export interface RequiredDocumentSpec {
  code: string;
  nameEn: string;
  nameMr: string;
  issuingAuthority: string;
  isMandatory: boolean;
  maxSizeKb: number;
  allowedExtensions: string[];
  descriptionEn: string;
  descriptionMr: string;
  instructionsEn: string;
}

export interface ScholarshipScheme {
  id: string;
  code: string;
  nameEn: string;
  nameMr: string;
  departmentEn: string;
  departmentMr: string;
  category: 'EBC' | 'SC' | 'ST' | 'OBC' | 'VJNT' | 'SBC' | 'MINORITY' | 'OPEN';
  incomeCapInr: number;
  incomeCapLabel: string;
  domicileRequired: boolean;
  requiredDocuments: RequiredDocumentSpec[];
  overviewEn: string;
  overviewMr: string;
  officialPortalUrl: string;
}

export interface UploadedDocRecord {
  id: string;
  docCode: string;
  fileName: string;
  fileSizeKb: number;
  fileType: string;
  uploadedAt: string;
  isSimulated: boolean;
  status: 'ready' | 'flagged' | 'invalid';
  customNotes?: string;
  file?: File;
}

export interface FindingItem {
  id: string;
  type: FindingStatus;
  criterionTitle: string;
  titleEn: string;
  titleMr: string;
  badgeLabel: string;
  flagReasonEn: string;
  remediationActionEn: string;
  searchPool: string;
  docCode?: string;
  docA?: {
    title: string;
    value: string;
    meta: string;
  };
  docB?: {
    title: string;
    value: string;
    meta: string;
  };
  detailsOcr?: {
    sourceA: string;
    sourceB: string;
  };
  verifiedByStudent?: boolean;
  barcodeConfirmed?: boolean;
}

export interface AuditReportData {
  prepId: string;
  generatedDate: string;
  studentName: string;
  collegeName: string;
  schemeId: string;
  schemeNameEn: string;
  departmentNameEn: string;
  overallReadiness: number;
  verifiedCount: number;
  reviewCount: number;
  missingCount: number;
  findings: FindingItem[];
}
