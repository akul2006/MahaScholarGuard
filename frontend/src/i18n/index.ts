/**
 * MahaScholar Guard — Translation Dictionary
 * Single source of truth for all UI text in English (en) and Marathi (mr).
 *
 * USAGE:
 *   import { t } from '../i18n';
 *   t('uploadTitle', language)  // → 'Upload Scholarship Documents' | 'शिष्यवृत्ती कागदपत्रे अपलोड करा'
 *
 * NOTES:
 * - Keys whose Marathi translation is marked [TODO] are intentional stubs.
 *   They fall back to English and must be reviewed by a native Marathi speaker.
 * - Official scheme names and proper nouns (MahaDBT, UIDAI, COEP, etc.) are
 *   kept in English or the established Devanagari form where universally used.
 * - Dynamic strings use a factory pattern: keys ending in 'Fn' receive
 *   parameters and return a string.
 */

import { Language } from '../types';

const translations: Record<string, { en: string; mr: string }> = {
  // ── Shared / Global ──────────────────────────────────────────────────────
  appName:              { en: 'MahaScholar Guard', mr: 'महास्कॉलर गार्ड' },
  appTagline:           { en: 'Document Readiness Assistant', mr: 'कागदपत्र तयारी सहाय्यक' },
  betaBadge:            { en: 'Beta', mr: 'बीटा' },
  loading:              { en: 'Loading…', mr: 'लोड होत आहे…' },
  retry:                { en: 'Retry', mr: 'पुन्हा प्रयत्न करा' },
  save:                 { en: 'Save', mr: 'जतन करा' },
  cancel:               { en: 'Cancel', mr: 'रद्द करा' },
  close:                { en: 'Close', mr: 'बंद करा' },
  dismiss:              { en: 'Dismiss', mr: 'काढून टाका' },
  back:                 { en: 'Back', mr: 'मागे' },
  next:                 { en: 'Next', mr: 'पुढे' },
  continue:             { en: 'Continue', mr: 'सुरू ठेवा' },
  print:                { en: 'Print', mr: 'मुद्रण' },
  download:             { en: 'Download', mr: 'डाउनलोड' },
  share:                { en: 'Share', mr: 'शेअर करा' },
  upload:               { en: 'Upload', mr: 'अपलोड' },
  search:               { en: 'Search', mr: 'शोधा' },
  edit:                 { en: 'Edit', mr: 'संपादित करा' },
  remove:               { en: 'Remove', mr: 'काढा' },
  saveChanges:          { en: 'Save Changes', mr: 'बदल जतन करा' },
  optional:             { en: 'Optional', mr: 'पर्यायी' },
  mandatory:            { en: 'Mandatory', mr: 'अनिवार्य' },
  verified:             { en: 'Verified', mr: 'सत्यापित' },
  missing:              { en: 'Missing', mr: 'गहाळ' },
  review:               { en: 'Review', mr: 'पुनरावलोकन' },
  notConnected:         { en: 'Not connected', mr: 'कनेक्ट नाही' },
  connected:            { en: 'Connected', mr: 'जोडलेले' },
  checking:             { en: 'Checking', mr: 'तपासत आहे' },
  offline:              { en: 'Offline', mr: 'ऑफलाइन' },

  // ── Statutory / Advisory Disclaimer ─────────────────────────────────────
  independentAdvisory:  { en: 'Independent Citizen Advisory Tool', mr: 'स्वतंत्र नागरिक सल्लागार साधन' },
  advisoryDescription:  {
    en: 'MahaScholar Guard is an independent document readiness assistant for Maharashtra students. It is NOT an official government portal (MahaDBT) and does not evaluate, approve applications, or guarantee scholarship disbursements.',
    mr: 'महास्कॉलर गार्ड हे महाराष्ट्रातील विद्यार्थ्यांसाठी स्वतंत्र कागदपत्र तयारी सहाय्यक आहे. हे अधिकृत सरकारी पोर्टल (MahaDBT) नाही आणि ते अर्जांचे मूल्यमापन, मंजूरी किंवा शिष्यवृत्ती वितरणाची हमी देत नाही.',
  },
  officialMahaDBT:      { en: 'Official MahaDBT', mr: 'अधिकृत MahaDBT' },
  statutoryDisclaimer:  { en: 'Statutory & Advisory Disclaimer', mr: 'वैधानिक व सल्लागार अस्वीकरण' },
  statutoryText:        {
    en: 'MahaScholar Guard is an independent preparation assistant, not affiliated with or endorsed by MahaDBT or any government department. Does not grant approvals or guarantee scholarships. All status ratings denote personal readiness heuristics prior to official submission on mahadbt.maharashtra.gov.in.',
    mr: 'महास्कॉलर गार्ड हे स्वतंत्र पूर्वतयारी सहाय्यक साधन आहे. याचा महाडीबीटी (MahaDBT) किंवा महाराष्ट्र शासनाच्या कोणत्याही विभागाशी थेट संबंध किंवा संलग्नता नाही. हे साधन शिष्यवृत्ती मंजूर करत नाही अथवा अनुदानाची हमी देत नाही. सर्व दर्जा mahadbt.maharashtra.gov.in वर अंतिम अर्ज करण्यापूर्वी वैयक्तिक तयारीचे संकेत देतात.',
  },

  // ── Header / Navbar ──────────────────────────────────────────────────────
  advisoryStrip:        {
    en: 'Independent Advisory Tool • Non-governmental scholarship readiness checker for Maharashtra applicants',
    mr: 'स्वतंत्र सल्लागार साधन • महाराष्ट्र अर्जदारांसाठी गैर-शासकीय शिष्यवृत्ती तयारी तपासणी',
  },
  citizenHelpline:      { en: 'Citizen Advisory Helpline: active', mr: 'नागरिक सहाय्यता: कार्यरत' },
  navHome:              { en: 'Home', mr: 'मुख्यपृष्ठ' },
  navDashboard:         { en: 'Dashboard', mr: 'डॅशबोर्ड' },
  navSchemeSelection:   { en: 'Scheme Selection', mr: 'योजना निवड' },
  navUploadWizard:      { en: 'Upload Wizard', mr: 'कागदपत्रे अपलोड' },
  navDocumentReview:    { en: 'Document Review', mr: 'तपासणी' },
  navReadinessReport:   { en: 'Readiness Report', mr: 'तयारी अहवाल' },
  toggleLanguage:       { en: 'English / मराठी', mr: 'मराठी' },
  notifications:        { en: 'Notifications', mr: 'सूचना' },
  notificationsNew:     { en: '2 New', mr: '२ नवीन' },
  notifIncomeTitle:     { en: 'Action Required: Income Certificate', mr: 'कृती आवश्यक: उत्पन्नाचा दाखला' },
  notifIncomeBody:      { en: 'Upload Tahsildar barcoded slip for AY 2024-25', mr: 'AY 2024-25 साठी तहसीलदार बारकोड स्लिप अपलोड करा' },
  notifNameTitle:       { en: 'Name Mismatch Detected', mr: 'नावात तफावत आढळली' },
  notifNameBody:        { en: 'Aadhaar vs HSC Marksheet initials flagged', mr: 'आधार व HSC गुणपत्रिकेतील नावात फरक दिसला' },

  // ── Footer ───────────────────────────────────────────────────────────────
  footerCopyright:      { en: '© 2025 MahaScholar Guard', mr: '© 2025 महास्कॉलर गार्ड' },
  footerChapter:        { en: 'Pune University Guidance Chapter', mr: 'पुणे विद्यापीठ मार्गदर्शन विभाग' },
  privacyDirective:     { en: 'Privacy Directive', mr: 'गोपनीयता निर्देश' },
  documentSafety:       { en: 'Document Safety Standard', mr: 'कागदपत्र सुरक्षा मानक' },

  // ── Landing Screen ───────────────────────────────────────────────────────
  landingBadge:         { en: 'Civic-Tech • Maharashtra Higher Education Support', mr: 'नागरिक-तंत्रज्ञान • महाराष्ट्र उच्च शिक्षण सहाय्य' },
  landingHeroLine1:     { en: 'Your Scholarship Papers.', mr: 'तुमची शिष्यवृत्ती कागदपत्रे.' },
  landingHeroLine2:     { en: 'Audited & Verified', mr: 'तपासलेली व सत्यापित' },
  landingHeroLine3:     { en: 'Before Portal Upload.', mr: 'पोर्टलवर अपलोड करण्यापूर्वी.' },
  landingSubtext:       {
    en: 'Avoid last-minute scrutinies and rejected portal claims. Audit your Caste Validity, Tahsildar Income Slip, Domicile, and SSC/HSC marksheets against active Maharashtra state requirements in seconds.',
    mr: 'शेवटच्या क्षणाची छाननी आणि पोर्टल दावे नाकारणे टाळा. तुमचे जात वैधता, तहसीलदार उत्पन्न दाखला, अधिवास व SSC/HSC गुणपत्रिका महाराष्ट्र राज्याच्या सद्य आवश्यकतांशी जुळतात का ते सेकंदात तपासा.',
  },
  landingCheckBtn:      { en: 'Check My Documents Now', mr: 'माझी कागदपत्रे आता तपासा' },
  landingWalkthroughBtn:{ en: 'See Verification Walkthrough', mr: 'सत्यापन प्रक्रिया पहा' },
  landingFree:          { en: '100% Free For All Students', mr: '१००% विनामूल्य सर्व विद्यार्थ्यांसाठी' },
  landingEphemeral:     { en: 'Ephemeral / Zero Data Retention', mr: 'तात्पुरते / शून्य डेटा संचयन' },
  landingAuditTime:     { en: 'Audit Results in < 90 Sec', mr: '< ९० सेकंदात निकाल' },
  landingDemoCard:      { en: 'Live Audit Engine Demo', mr: 'थेट ऑडिट इंजिन डेमो' },
  landingDemoCluster:   { en: 'SPPU / Pune Eng. Cluster', mr: 'SPPU / पुणे अभियांत्रिकी क्लस्टर' },
  landingHowTitle:      { en: 'How MahaScholar Guard Works', mr: 'महास्कॉलर गार्ड कसे काम करते' },
  landingHowSubtext:    { en: 'A 4-step deterministic verification engine built for Maharashtra scholarship compliance', mr: '४-चरण निश्चित सत्यापन इंजिन महाराष्ट्र शिष्यवृत्ती अनुपालनासाठी तयार केले' },
  landingStep1Title:    { en: 'Select Your Scholarship Scheme', mr: 'तुमची शिष्यवृत्ती योजना निवडा' },
  landingStep1Body:     { en: 'Choose from EBC, SC, ST, OBC, VJNT, and Minority schemes with their specific document requirements from MahaDBT.', mr: 'MahaDBT च्या विशिष्ट कागदपत्रांच्या आवश्यकतांसह EBC, SC, ST, OBC, VJNT आणि अल्पसंख्याक योजनांमधून निवडा.' },
  landingStep2Title:    { en: 'Upload Documents In-Browser', mr: 'ब्राउझरमध्ये कागदपत्रे अपलोड करा' },
  landingStep2Body:     { en: 'Certificates are inspected entirely within your browser — no cloud uploads, no data retention, zero personal information collected.', mr: 'प्रमाणपत्रे पूर्णपणे तुमच्या ब्राउझरमध्ये तपासली जातात — क्लाउड अपलोड नाही, डेटा संचयन नाही, वैयक्तिक माहिती गोळा होत नाही.' },
  landingStep3Title:    { en: 'Verify Extracted Information', mr: 'काढलेली माहिती सत्यापित करा' },
  landingStep3Body:     { en: 'Cross-check name spelling, income thresholds, domicile dates, and Aadhaar seeding status across all submitted certificates.', mr: 'सर्व सादर केलेल्या प्रमाणपत्रांमध्ये नावाचे स्पेलिंग, उत्पन्न मर्यादा, अधिवास तारखा आणि आधार सीडिंग स्थिती तपासा.' },
  landingStep4Title:    { en: 'Download Your Readiness Audit', mr: 'तुमचा तयारी ऑडिट डाउनलोड करा' },
  landingStep4Body:     { en: 'Export a clear readiness report to present at your college scholarship desk before submitting on the official MahaDBT portal.', mr: 'अधिकृत MahaDBT पोर्टलवर सादर करण्यापूर्वी तुमच्या महाविद्यालयाच्या शिष्यवृत्ती काउंटरवर सादर करण्यासाठी स्पष्ट तयारी अहवाल डाउनलोड करा.' },
  landingStartAudit:    { en: 'Start Document Audit', mr: 'कागदपत्र ऑडिट सुरू करा' },
  landingFaqTitle:      { en: 'Frequently Asked Questions', mr: 'वारंवार विचारले जाणारे प्रश्न' },

  // ── Dashboard Screen ─────────────────────────────────────────────────────
  dashboardStartNew:    { en: 'Start New Check', mr: 'नवीन तपासणी सुरू करा' },
  dashboardViewSchemes: { en: 'View Schemes', mr: 'योजना पहा' },
  dashboardActiveDossier:{ en: 'Active Document Audit Dossier', mr: 'सक्रिय कागदपत्र ऑडिट डोसियर' },
  dashboardTargetScheme:{ en: 'Target Scheme', mr: 'लक्ष्य योजना' },
  dashboardReadinessGrade:{ en: 'Readiness Grade', mr: 'तयारी श्रेणी' },
  dashboardNeedsAttention:{ en: 'Needs Attention', mr: 'लक्ष आवश्यक' },
  dashboardVerifiedReady:{ en: 'Verified Ready', mr: 'सत्यापित तयार' },
  dashboardFlaggedReview:{ en: 'Flagged for Review', mr: 'पुनरावलोकनासाठी चिन्हांकित' },
  dashboardMissingRequired:{ en: 'Missing Required', mr: 'आवश्यक गहाळ' },
  dashboardDocuments:   { en: 'Documents', mr: 'कागदपत्रे' },
  dashboardItems:       { en: 'Items', mr: 'प्रकरणे' },
  dashboardDocument:    { en: 'Document', mr: 'कागदपत्र' },
  dashboardLastAudited: { en: 'Last audited:', mr: 'शेवटचा ऑडिट:' },
  dashboardReviewData:  { en: 'Review Extracted Data', mr: 'काढलेला डेटा पुनरावलोकन करा' },
  dashboardOpenReport:  { en: 'Open Full Report', mr: 'संपूर्ण अहवाल उघडा' },
  dashboardRejectionTitle:{ en: 'Top Reasons for MahaDBT Rejections in Maharashtra', mr: 'महाराष्ट्रातील MahaDBT नाकारण्याची प्रमुख कारणे' },
  dashboardRejectionSub:{ en: 'Analysis based on over 48,000 scrutiny returns across 36 districts', mr: '३६ जिल्ह्यांमधील ४८,०००+ छाननी परतावांवर आधारित विश्लेषण' },
  dashboardReject1:     { en: '1. Name / Transliteration Variations (Aadhaar vs Marksheet)', mr: '१. नाव / लिप्यंतरण भिन्नता (आधार वि. गुणपत्रिका)' },
  dashboardReject2:     { en: '2. Expired or Non-Preceding FY Income Certificate', mr: '२. कालबाह्य किंवा पूर्वीच्या आर्थिक वर्षातील उत्पन्न दाखला नाही' },
  dashboardReject3:     { en: '3. Missing Non-Creamy Layer (NCL) or Caste Validity', mr: '३. नॉन-क्रिमी लेयर (NCL) किंवा जात वैधता गहाळ' },
  dashboardReject4:     { en: '4. Aadhaar Not Seeded with NPCI for DBT Payouts', mr: '४. DBT पेआउटसाठी NPCI सोबत आधार सीड केलेला नाही' },
  dashboardDeadlinesTitle:{ en: 'Key Maharashtra Deadlines', mr: 'महाराष्ट्रातील महत्त्वाच्या अंतिम मुदती' },
  dashboardDeadline1Title:{ en: 'MahaDBT Fresh Application', mr: 'MahaDBT नवीन अर्ज' },
  dashboardDeadline1Date:{ en: '31 December 2024', mr: '३१ डिसेंबर २०२४' },
  dashboardDeadline1Body:{ en: 'DTE / DHE Higher Education scholarship portal closing date.', mr: 'DTE / DHE उच्च शिक्षण शिष्यवृत्ती पोर्टल बंद होण्याची तारीख.' },
  dashboardDeadline2Title:{ en: 'College Nodal Desk Scrutiny', mr: 'महाविद्यालय नोडल काउंटर छाननी' },
  dashboardDeadline2Date:{ en: '15 January 2025', mr: '१५ जानेवारी २०२५' },
  dashboardDeadline2Body:{ en: 'Institutional verification deadline for SPPU colleges.', mr: 'SPPU महाविद्यालयांसाठी संस्थात्मक पडताळणीची अंतिम मुदत.' },
  dashboardDeadline3Title:{ en: 'Departmental Disbursal', mr: 'विभागीय वितरण' },
  dashboardDeadline3Date:{ en: 'March 2025', mr: 'मार्च २०२५' },
  dashboardDeadline3Body:{ en: 'First installment direct credit via PFMS/NPCI.', mr: 'PFMS/NPCI द्वारे पहिला हप्ता थेट जमा.' },
  dashboardActive:      { en: 'Active', mr: 'सक्रिय' },
  dashboardUpcoming:    { en: 'Upcoming', mr: 'येणारे' },
  dashboardScheduled:   { en: 'Scheduled', mr: 'नियोजित' },
  dashboardDeskTitle:   { en: 'Need College Scholarship Desk Support?', mr: 'महाविद्यालयाच्या शिष्यवृत्ती काउंटरची मदत हवी आहे का?' },
  dashboardDeskBody:    {
    en: 'Carry your printed MahaScholar Guard Readiness Dossier to the COEP Pune Scholarship section located at Main Building Ground Floor, Counter 3.',
    mr: 'तुमचा मुद्रित महास्कॉलर गार्ड तयारी डोसियर मुख्य इमारत भूतल, काउंटर ३ येथील COEP पुणे शिष्यवृत्ती विभागात घेऊन जा.',
  },
  dashboardPrintDossier:{ en: 'Print Dossier for Desk', mr: 'काउंटरसाठी डोसियर मुद्रित करा' },
  dashboardEBCfreeship: { en: 'Higher & Technical Education Dept • EBC 50% Tuition Freeship', mr: 'उच्च व तंत्रशिक्षण विभाग • EBC ५०% शिक्षण शुल्क सवलत' },

  // ── Backend Connection ────────────────────────────────────────────────────
  backendAPIHealth:     { en: 'Backend API Health', mr: 'बॅकएंड API स्थिती' },
  backendTargetURL:     { en: 'Target URL:', mr: 'लक्ष्य URL:' },
  backendStatusLabel:   { en: 'Status Description:', mr: 'स्थिती वर्णन:' },
  backendConnecting:    { en: 'Connecting to backend service…', mr: 'बॅकएंड सेवेशी जोडत आहे…' },
  backendActive:        { en: 'is active', mr: 'कार्यरत आहे' },
  backendCannotConnect: { en: 'Cannot connect. Check that the FastAPI server is running.', mr: 'कनेक्ट करता येत नाही. FastAPI सर्व्हर चालू आहे का ते तपासा.' },
  backendTimedOut:      { en: 'Connection timed out. Check that the FastAPI server is running.', mr: 'कनेक्शन टाइमआउट. FastAPI सर्व्हर चालू आहे का ते तपासा.' },
  backendService:       { en: 'Service:', mr: 'सेवा:' },
  backendVersion:       { en: 'Version:', mr: 'आवृत्ती:' },

  // ── Scheme Selection Screen ──────────────────────────────────────────────
  schemeCatalogBadge:   { en: 'Maharashtra Scholarship Catalog', mr: 'महाराष्ट्र शिष्यवृत्ती सूची' },
  schemePageTitle:      { en: 'Select Your Targeted Scholarship Scheme', mr: 'तुमची लक्ष्यित शिष्यवृत्ती योजना निवडा' },
  schemePageSubtext:    {
    en: 'Choose the scheme applicable to your social category, family income bracket, and degree course. Each scheme runs a deterministic document checklist audit.',
    mr: 'तुमच्या सामाजिक वर्ग, कौटुंबिक उत्पन्न गटानुसार आणि पदवी अभ्यासक्रमानुसार लागू असलेली योजना निवडा. प्रत्येक योजना निश्चित कागदपत्र तपासणी ऑडिट चालवते.',
  },
  schemeAllFilter:      { en: 'All Schemes (4)', mr: 'सर्व योजना (४)' },
  schemeEBCFilter:      { en: 'EBC / General', mr: 'EBC / सामान्य' },
  schemeSCFilter:       { en: 'SC / Navabuddha', mr: 'SC / नवबौद्ध' },
  schemeOBCFilter:      { en: 'OBC / VJNT / SBC', mr: 'OBC / VJNT / SBC' },
  schemeSTFilter:       { en: 'ST / Tribal', mr: 'ST / आदिवासी' },
  schemeSearchPlaceholder:{ en: 'Search scheme name or dept…', mr: 'योजनेचे नाव किंवा विभाग शोधा…' },
  schemeRequiredDocs:   { en: 'Required Docs', mr: 'आवश्यक कागदपत्रे' },
  schemeMandatoryDocs:  { en: 'Mandatory Checklist Items:', mr: 'अनिवार्य चेकलिस्ट:' },
  schemeMahaDBTInfo:    { en: 'MahaDBT Info', mr: 'MahaDBT माहिती' },
  schemeDomicileRequired:{ en: 'Maharashtra Domicile:', mr: 'महाराष्ट्र अधिवास:' },
  schemeDomicileMandatory:{ en: 'Mandatory', mr: 'अनिवार्य' },
  schemeSelectBtn:      { en: 'Select Scheme & Upload', mr: 'योजना निवडा व अपलोड करा' },
  schemeSelectedBtn:    { en: 'Selected • Continue', mr: 'निवडले • सुरू ठेवा' },
  schemeNoticeText:     {
    en: 'Official Government Resolution (GR) criteria. MahaScholar Guard operates with deterministic rules mapped to current Maharashtra administrative circulars.',
    mr: 'अधिकृत शासन निर्णय (GR) निकष. महास्कॉलर गार्ड महाराष्ट्र प्रशासनाच्या सद्य परिपत्रकांशी जोडलेल्या निश्चित नियमांसह कार्य करते.',
  },
  schemeEmptyState:     { en: 'No schemes match your filter.', mr: 'तुमच्या फिल्टरला कोणतीही योजना जुळत नाही.' },

  // ── Upload Wizard Screen ─────────────────────────────────────────────────
  uploadStepLabel:      { en: 'Step 02 of 04 • Document In-Memory Inspection', mr: 'चरण ०२ / ०४ • कागदपत्र इन-मेमरी तपासणी' },
  uploadTitle:          { en: 'Upload Scholarship Documents', mr: 'शिष्यवृत्ती कागदपत्रे अपलोड करा' },
  uploadAuditingFor:    { en: 'Auditing requirements for:', mr: 'यासाठी आवश्यकता ऑडिट करत आहे:' },
  uploadSampleBtn:      { en: 'Load Sample Student Dossier (Aarav Deshmukh)', mr: 'नमुना विद्यार्थी डोसियर लोड करा (आराव देशमुख)' },
  uploadEphemeralTitle: { en: 'Ephemeral In-Browser Processing (Zero Data Retention)', mr: 'तात्पुरती इन-ब्राउझर प्रक्रिया (शून्य डेटा संचयन)' },
  uploadEphemeralBody:  {
    en: 'Your certificates are inspected purely in client-side memory for schema and demographic verification. Files are never stored on external databases or sent to third parties.',
    mr: 'तुमची प्रमाणपत्रे केवळ स्कीमा आणि जनसांख्यिकीय सत्यापनासाठी क्लायंट-साइड मेमरीमध्ये तपासली जातात. फाइल्स बाह्य डेटाबेसवर कधीही साठवल्या जात नाहीत किंवा तृतीय पक्षांना पाठवल्या जात नाहीत.',
  },
  uploadIssuingAuth:    { en: 'Issuing Authority:', mr: 'जारी करणारी प्राधिकरण:' },
  uploadSpecs:          { en: 'Specs:', mr: 'वैशिष्ट्ये:' },
  uploadRule:           { en: 'Rule:', mr: 'नियम:' },
  uploadMax:            { en: 'Max', mr: 'कमाल' },
  uploadFileBtn:        { en: 'Upload File', mr: 'फाइल अपलोड करा' },
  uploadDocsAttached:   { en: 'Documents Attached', mr: 'कागदपत्रे जोडली' },
  uploadOf:             { en: 'of', mr: 'पैकी' },
  uploadBackSchemes:    { en: 'Back to Schemes', mr: 'योजनांकडे परत' },
  uploadProceedBtn:     { en: 'Proceed to OCR Extracted Data Review', mr: 'OCR काढलेल्या डेटा पुनरावलोकनाकडे पुढे जा' },
  uploadRemoveTitle:    { en: 'Remove document', mr: 'कागदपत्र काढा' },
  uploadInvalidFile:    { en: 'Invalid file format or size.', mr: 'अवैध फाइल स्वरूप किंवा आकार.' },

  // ── Document Review Screen ───────────────────────────────────────────────
  reviewStepLabel:      { en: 'Step 03 of 04 • Demographics & Value Verification', mr: 'चरण ०३ / ०४ • जनसांख्यिकी व मूल्य सत्यापन' },
  reviewTitle:          { en: 'Review OCR-Extracted Document Fields', mr: 'OCR-काढलेल्या कागदपत्र फील्ड पुनरावलोकन करा' },
  reviewSubtext:        {
    en: 'Compare parsed fields across your certificates. Make corrections before generating your final Readiness Audit.',
    mr: 'तुमच्या प्रमाणपत्रांमधील पार्स केलेले फील्ड तुलना करा. तुमचा अंतिम तयारी ऑडिट तयार करण्यापूर्वी दुरुस्त्या करा.',
  },
  reviewGenerateBtn:    { en: 'Generate Readiness Report', mr: 'तयारी अहवाल तयार करा' },
  reviewSimOCRTitle:    { en: 'Simulated Optical Character Recognition (OCR) Engine', mr: 'अनुकरण केलेले ऑप्टिकल कॅरेक्टर रेकग्निशन (OCR) इंजिन' },
  reviewSimOCRBody:     {
    en: 'The values below represent parsed data from your test dossier. You can edit any field to test how corrections impact your readiness score. In production, this connects to the Python FastAPI backend with Tesseract/DocTR.',
    mr: 'खालील मूल्ये तुमच्या चाचणी डोसियरमधून पार्स केलेला डेटा दर्शवतात. सुधारणा तयारी स्कोरवर कसा परिणाम करतात हे तपासण्यासाठी कोणतेही फील्ड संपादित करा. उत्पादनात, हे Python FastAPI बॅकएंडशी Tesseract/DocTR सह जोडते.',
  },
  reviewTableTitle:     { en: 'Cross-Document Demographic Parameters', mr: 'क्रॉस-डॉक्युमेंट जनसांख्यिकीय पॅरामीटर्स' },
  reviewTrackedLabel:   { en: 'Tracked Heuristics', mr: 'ट्रॅक केलेले हेयुरिस्टिक्स' },
  reviewVariationBadge: { en: 'Variation Flagged', mr: 'भिन्नता चिन्हांकित' },
  reviewPendingBadge:   { en: 'Pending Upload', mr: 'अपलोड प्रलंबित' },
  reviewCleanBadge:     { en: 'Clean Match', mr: 'स्वच्छ जुळणी' },
  reviewSourceLabel:    { en: 'Source:', mr: 'स्रोत:' },
  reviewEditBtn:        { en: 'Edit Value', mr: 'मूल्य संपादित करा' },
  reviewSaveBtn:        { en: 'Save', mr: 'जतन करा' },
  reviewCancelBtn:      { en: 'Cancel', mr: 'रद्द करा' },
  reviewToast:          { en: 'Field value updated & verified!', mr: 'फील्ड मूल्य अपडेट व सत्यापित झाले!' },
  reviewBackBtn:        { en: 'Back to Upload Wizard', mr: 'अपलोड विझार्डकडे परत' },
  reviewRunAuditBtn:    { en: 'Run Pre-Submission Audit & View Report', mr: 'पूर्व-सादरणी ऑडिट चालवा व अहवाल पहा' },

  // ── Readiness Report Screen ──────────────────────────────────────────────
  reportBreadcrumbDashboard:{ en: 'Dashboard', mr: 'डॅशबोर्ड' },
  reportBreadcrumbChecks:{ en: 'Document Checks', mr: 'कागदपत्र तपासण्या' },
  reportBreadcrumbCheck: { en: 'Check #', mr: 'तपासणी #' },
  reportBreadcrumbReport:{ en: 'Readiness Report', mr: 'तयारी अहवाल' },
  reportPreSubmissionBadge:{ en: 'Pre-Submission Audit', mr: 'पूर्व-सादरणी ऑडिट' },
  reportPrepID:         { en: 'Application Prep ID:', mr: 'अर्ज तयारी ID:' },
  reportGenerated:      { en: 'Generated:', mr: 'तयार केले:' },
  reportTitle:          { en: 'Document Readiness Audit Report', mr: 'कागदपत्र तयारी ऑडिट अहवाल' },
  reportTargetScheme:   { en: 'Target Scholarship Scheme', mr: 'लक्ष्य शिष्यवृत्ती योजना' },
  reportCandidate:      { en: 'Candidate:', mr: 'उमेदवार:' },
  reportDownloadPDF:    { en: 'Download PDF Report', mr: 'PDF अहवाल डाउनलोड करा' },
  reportShareSummary:   { en: 'Share Summary', mr: 'सारांश शेअर करा' },
  reportPrintChecklist: { en: 'Print Checklist', mr: 'चेकलिस्ट मुद्रित करा' },
  reportShareToast:     { en: 'Sharable audit link copied to clipboard!', mr: 'शेअर करण्यायोग्य ऑडिट लिंक क्लिपबोर्डवर कॉपी झाली!' },
  reportSaveToast:      { en: 'Audit state saved to your student dashboard!', mr: 'ऑडिट स्थिती तुमच्या विद्यार्थी डॅशबोर्डवर जतन झाली!' },
  reportOverallReadiness:{ en: 'Overall Readiness', mr: 'एकंदर तयारी' },
  reportNeedsAttention: { en: 'Needs Attention', mr: 'लक्ष आवश्यक' },
  reportAdvisoryOnly:   { en: 'Advisory guidance only. Official approval rests solely with the competent authority.', mr: 'केवळ सल्लागार मार्गदर्शन. अधिकृत मंजूरी केवळ सक्षम प्राधिकरणाकडे असते.' },
  reportCompleteVerified:{ en: 'Complete & Verified', mr: 'पूर्ण व सत्यापित' },
  reportNeedsReview:    { en: 'Needs Review', mr: 'पुनरावलोकन आवश्यक' },
  reportMissingRequired:{ en: 'Missing Required', mr: 'आवश्यक गहाळ' },
  reportCritical:       { en: 'Critical', mr: 'गंभीर' },
  reportFlagged:        { en: 'Flagged', mr: 'चिन्हांकित' },
  reportStudentAction:  { en: 'Student action suggested', mr: 'विद्यार्थी कृती सुचवली' },
  reportAllMandatory:   { en: 'All Mandatory Attached', mr: 'सर्व अनिवार्य जोडले' },
  reportAllRequired:    { en: 'All required scheme certificates attached', mr: 'सर्व आवश्यक योजना प्रमाणपत्रे जोडली' },
  reportReadySubmission:{ en: 'Ready for submission', mr: 'सादरणीसाठी तयार' },
  reportMandatoryForApproval:{ en: 'Mandatory for scheme approval', mr: 'योजना मंजूरीसाठी अनिवार्य' },
  reportAllFindings:    { en: 'All Findings', mr: 'सर्व निष्कर्ष' },
  reportFilterMissing:  { en: 'Missing', mr: 'गहाळ' },
  reportFilterReview:   { en: 'Review', mr: 'पुनरावलोकन' },
  reportFilterVerified: { en: 'Verified', mr: 'सत्यापित' },
  reportSearchPlaceholder:{ en: 'Search criteria, doc names…', mr: 'निकष, कागदपत्राचे नाव शोधा…' },
  reportNoFindings:     { en: 'No findings match your current filter.', mr: 'तुमच्या सध्याच्या फिल्टरला कोणतेही निष्कर्ष जुळत नाहीत.' },
  reportReadyToArchive: { en: 'Ready to archive', mr: 'संग्रहित करण्यास तयार' },
  reportNoPendingReview:{ en: 'No pending review items', mr: 'कोणतेही प्रलंबित पुनरावलोकन प्रकरण नाही' },
  reportAllVerified:    { en: 'All documents verified and ready for MahaDBT submission.', mr: 'सर्व कागदपत्रे सत्यापित आणि MahaDBT सादरणीसाठी तयार.' },
  reportItemsNeedVerification:{ en: 'items require verification before final submission on MahaDBT portal.', mr: 'प्रकरणांना MahaDBT पोर्टलवर अंतिम सादरणीपूर्वी सत्यापन आवश्यक आहे.' },
  reportCriteriaCleared:{ en: 'of', mr: 'पैकी' },
  reportCriteriaCleared2:{ en: 'criteria cleared for', mr: 'निकष मंजूर' },
  reportNoDocsYet:      { en: 'No documents verified yet. Upload required scheme documents.', mr: 'अद्याप कोणतेही कागदपत्र सत्यापित नाही. आवश्यक योजना कागदपत्रे अपलोड करा.' },
  reportMissingCertPending:{ en: 'mandatory certificate(s) pending', mr: 'अनिवार्य प्रमाणपत्रे प्रलंबित' },
  // Action roadmap
  reportActionRoadmap:  { en: 'Action Roadmap for Scheme Compliance', mr: 'योजना अनुपालनासाठी कृती रोडमॅप' },
  reportActionSubtext:  { en: 'Priority actions required before your MahaDBT portal submission', mr: 'MahaDBT पोर्टल सादरणीपूर्वी आवश्यक प्राधान्य कृती' },
  reportStep1Complete:  { en: 'Acquire missing mandatory documents', mr: 'गहाळ अनिवार्य कागदपत्रे मिळवा' },
  reportStep1Done:      { en: 'All mandatory documents attached', mr: 'सर्व अनिवार्य कागदपत्रे जोडली' },
  reportStep2:          { en: 'Resolve flagged discrepancies', mr: 'चिन्हांकित विसंगती दूर करा' },
  reportStep3:          { en: 'Visit college scholarship desk for verification', mr: 'सत्यापनासाठी महाविद्यालयाच्या शिष्यवृत्ती काउंटरला भेट द्या' },
  reportStep4:          { en: 'Submit on official MahaDBT portal', mr: 'अधिकृत MahaDBT पोर्टलवर सादर करा' },
  // Finding card labels
  reportVerifiedBadge:  { en: 'Verified', mr: 'सत्यापित' },
  reportReviewBadge:    { en: 'Needs Review', mr: 'पुनरावलोकन आवश्यक' },
  reportMissingBadge:   { en: 'Missing', mr: 'गहाळ' },
  reportDocALabel:      { en: 'Document A', mr: 'कागदपत्र A' },
  reportDocBLabel:      { en: 'Document B', mr: 'कागदपत्र B' },
  reportFlagReason:     { en: 'Finding Details:', mr: 'निष्कर्ष तपशील:' },
  reportRemediation:    { en: 'Recommended Action:', mr: 'शिफारस केलेली कृती:' },
  reportBarcodeConfirm: { en: 'Confirm Barcode Valid (Aaple Sarkar)', mr: 'बारकोड वैध असल्याची पुष्टी करा (आपले सरकार)' },
  reportBarcodeConfirmed:{ en: 'Barcode Confirmed', mr: 'बारकोड पुष्टी झाला' },
  reportAffidavitNote:  { en: 'Mark: Affidavit to be submitted at desk', mr: 'चिन्हांकित करा: शपथपत्र काउंटरवर सादर करायचे आहे' },
  reportAffidavitMarked:{ en: 'Affidavit Noted', mr: 'शपथपत्र नोंद झाले' },
  reportFastTrackUpload:{ en: 'Fast-Track Upload', mr: 'त्वरित अपलोड' },
  reportOCRSnippet:     { en: 'View OCR Snippet', mr: 'OCR स्निपेट पहा' },
  reportHideOCR:        { en: 'Hide OCR Snippet', mr: 'OCR स्निपेट लपवा' },
  reportFinishSave:     { en: 'Finish & Save Audit State', mr: 'समाप्त करा व ऑडिट स्थिती जतन करा' },

  // ── Validation Results (new rules engine) ────────────────────────────────
  validateTitle:        { en: 'Backend Document Validation', mr: 'बॅकएंड कागदपत्र सत्यापन' },
  validateRunBtn:       { en: 'Run Backend Validation', mr: 'बॅकएंड सत्यापन चालवा' },
  validateRunning:      { en: 'Validating with backend rules engine…', mr: 'बॅकएंड नियम इंजिनसह सत्यापन होत आहे…' },
  validateSuccess:      { en: 'Backend validation complete', mr: 'बॅकएंड सत्यापन पूर्ण' },
  validateAllPresent:   { en: 'All required documents are present.', mr: 'सर्व आवश्यक कागदपत्रे उपस्थित आहेत.' },
  validateMissingDocs:  { en: 'Missing required documents:', mr: 'गहाळ आवश्यक कागदपत्रे:' },
  validateError:        { en: 'Backend validation failed. Using local readiness check.', mr: 'बॅकएंड सत्यापन अयशस्वी. स्थानिक तयारी तपासणी वापरत आहे.' },
  validateRetry:        { en: 'Retry Validation', mr: 'सत्यापन पुन्हा प्रयत्न करा' },
  validatePrototype:    {
    en: '⚠ Prototype Rules: These document requirements are illustrative and unverified against official Government Resolutions. Do not rely on them for official submission decisions.',
    mr: '⚠ प्रोटोटाइप नियम: ही कागदपत्र आवश्यकता अधिकृत शासन निर्णयांशी अनुकरणीय आणि असत्यापित आहे. अधिकृत सादरणी निर्णयांसाठी यावर अवलंबून राहू नका.',
  },
  validateDisclaimer:   {
    en: 'This is an advisory result only. It does not determine official scholarship eligibility.',
    mr: 'हा केवळ सल्लागार निकाल आहे. हे अधिकृत शिष्यवृत्ती पात्रता निर्धारित करत नाही.',
  },
  validateSchemeID:     { en: 'Scheme ID:', mr: 'योजना ID:' },
  validateReadiness:    { en: 'Document Readiness:', mr: 'कागदपत्र तयारी:' },
  validateAllDocs:      { en: 'Complete', mr: 'पूर्ण' },
  validateIncomplete:   { en: 'Incomplete', mr: 'अपूर्ण' },
  validateNotAvailable: { en: 'Validation Unavailable', mr: 'सत्यापन उपलब्ध नाही' },
  validateNotAvailableBody:{ en: 'Could not reach the backend validation service. Results shown here are from the local readiness engine only.', mr: 'बॅकएंड सत्यापन सेवेपर्यंत पोहोचता आले नाही. येथे दाखवलेले निकाल केवळ स्थानिक तयारी इंजिनमधून आहेत.' },

  // ── Modals ───────────────────────────────────────────────────────────────
  walkthroughTitle:     { en: 'Verification Walkthrough', mr: 'सत्यापन प्रक्रिया' },
  walkthroughSubtext:   { en: 'How MahaScholar Guard audits your documents in 4 simple stages', mr: 'महास्कॉलर गार्ड ४ सोप्या टप्प्यांत तुमची कागदपत्रे कशी ऑडिट करते' },
  walkthroughStep1Title:{ en: 'Deterministic Scheme Checklist', mr: 'निश्चित योजना चेकलिस्ट' },
  walkthroughStep1Body: { en: 'Each Maharashtra department (DTE, Social Justice, Tribal, OBC) imposes distinct mandates. EBC requires Tahsildar Income ≤ 8L, while SC/ST mandates Caste Validity from Scrutiny Committees.', mr: 'प्रत्येक महाराष्ट्र विभाग (DTE, सामाजिक न्याय, आदिवासी, OBC) वेगळे अनिवार्य नियम लागू करतो. EBC ला तहसीलदार उत्पन्न ≤ ८ लाख आवश्यक आहे, तर SC/ST ला छाननी समित्यांकडून जात वैधता अनिवार्य आहे.' },
  walkthroughStep2Title:{ en: 'Zero-Storage In-Memory Inspection', mr: 'शून्य-संचयन इन-मेमरी तपासणी' },
  walkthroughStep2Body: { en: 'Files are evaluated locally in memory. No Aadhaar numbers, bank accounts, or sensitive documents are uploaded to cloud servers or databases.', mr: 'फाइल्स स्थानिकपणे मेमरीमध्ये मूल्यमापन केल्या जातात. कोणतेही आधार क्रमांक, बँक खाते किंवा संवेदनशील कागदपत्रे क्लाउड सर्व्हर किंवा डेटाबेसवर अपलोड केली जात नाहीत.' },
  walkthroughStep3Title:{ en: 'Cross-Document Discrepancy Flagging', mr: 'क्रॉस-डॉक्युमेंट विसंगती चिन्हांकित करणे' },
  walkthroughStep3Body: { en: 'Detects minor name differences between Board Marksheets and Aadhaar and alerts you to carry an Annexure A self-affidavit to your college desk.', mr: 'बोर्ड गुणपत्रिका आणि आधार यांच्यातील नावाच्या किरकोळ फरक ओळखतो आणि तुम्हाला तुमच्या महाविद्यालयाच्या काउंटरवर Annexure A शपथपत्र घेऊन जाण्यास सूचित करतो.' },
  walkthroughStep4Title:{ en: 'College-Ready Remediation Slip', mr: 'महाविद्यालय-तयार उपाय स्लिप' },
  walkthroughStep4Body: { en: 'Export an instant PDF summary to present directly to your college Scholarship Clerk or Nodal Officer at SPPU/COEP before submitting on mahadbt.maharashtra.gov.in.', mr: 'mahadbt.maharashtra.gov.in वर सादर करण्यापूर्वी SPPU/COEP येथील तुमच्या महाविद्यालयाच्या शिष्यवृत्ती लिपिक किंवा नोडल अधिकाऱ्याला थेट सादर करण्यासाठी त्वरित PDF सारांश डाउनलोड करा.' },
  walkthroughStartBtn:  { en: 'Start My Document Audit', mr: 'माझा कागदपत्र ऑडिट सुरू करा' },
  editRecordTitle:      { en: 'Edit Candidate Identity Record', mr: 'उमेदवार ओळख रेकॉर्ड संपादित करा' },
  editRecordNameLabel:  { en: 'Candidate Legal Name (as per SSC / Board Records)', mr: 'उमेदवाराचे कायदेशीर नाव (SSC / बोर्ड नोंदीनुसार)' },
  editRecordNameHint:   { en: 'Ensure this matches your Board Qualifying Exam Passing Certificate.', mr: 'हे तुमच्या बोर्ड पात्रता परीक्षा उत्तीर्ण प्रमाणपत्राशी जुळते याची खात्री करा.' },
  editRecordAadhaarComp:{ en: 'Aadhaar Format Comparison:', mr: 'आधार स्वरूप तुलना:' },
};

/**
 * Returns the translation for a given key and language.
 * Falls back to English if the Marathi string is missing or equals the English string.
 */
export function t(key: string, language: Language): string {
  const entry = translations[key];
  if (!entry) {
    // Unknown key — return the key itself so missing translations are visible in dev
    return `[${key}]`;
  }
  if (language === 'mr') {
    return entry.mr || entry.en;
  }
  return entry.en;
}

export default translations;

