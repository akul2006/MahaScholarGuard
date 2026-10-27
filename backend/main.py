import os
from typing import List, Optional
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(
    title="MahaScholar Guard API",
    description="Backend API for scholarship document readiness checks and rules evaluation.",
    version="0.2.0",
)

# Development origins: Vite frontend runs on port 3000 by default (package.json / vite.config.ts),
# with port 5173 retained for standard Vite dev server fallback.
DEFAULT_DEV_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

# Allow overriding/extending allowed origins via environment variable in production
env_origins = os.getenv("ALLOWED_ORIGINS")
allowed_origins = [
    origin.strip() for origin in env_origins.split(",") if origin.strip()
] if env_origins else DEFAULT_DEV_ORIGINS

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Accept"],
)

# ---------------------------------------------------------------------------
# Transparent Rules Engine Data (Prototype / Unverified)
# Notice: Scheme rules are illustrative prototypes and pending official GR verification.
# ---------------------------------------------------------------------------
SCHEME_RULES = {
    "spp-ebc-01": {
        "schemeNameEn": "Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Yojna (EBC)",
        "schemeNameMr": "राजर्षी छत्रपती शाहू महाराज शिक्षण शुल्क शिष्यवृत्ती योजना (ईबीसी)",
        "rulesetStatus": "prototype_unverified",
        "warningEn": "Prototype Rules: Document requirements are preliminary and pending official Government Resolution (GR) verification.",
        "warningMr": "प्रोटोटाइप नियम: कागदपत्र आवश्यकता प्राथमिक असून अधिकृत शासन निर्णयानुसार (GR) पडताळणी प्रलंबित आहे.",
        "requiredDocuments": [
            {
                "code": "INCOME_CERT",
                "nameEn": "Tahsildar Income Certificate",
                "nameMr": "तहसीलदार उत्पन्नाचा दाखला",
                "issuingAuthorityEn": "Tahsildar / Sub-Divisional Officer",
                "issuingAuthorityMr": "तहसीलदार / उपविभागीय अधिकारी (आपले सरकार बारकोड)",
                "instructionsEn": "Must be for FY 2023-24 (AY 2024-25) barcoded via Aaple Sarkar.",
                "instructionsMr": "आपले सरकार पोर्टलवरून जारी केलेला आर्थिक वर्ष २०२३-२४ चा बारकोड दाखला आवश्यक.",
            },
            {
                "code": "DOMICILE_CERT",
                "nameEn": "Maharashtra Domicile Certificate",
                "nameMr": "महाराष्ट्र अधिवास प्रमाणपत्र",
                "issuingAuthorityEn": "Executive Magistrate / Tahsildar",
                "issuingAuthorityMr": "कार्यकारी दंडाधिकारी / तहसीलदार",
                "instructionsEn": "Continuous 15-year Maharashtra residence proof.",
                "instructionsMr": "महाराष्ट्रात १५ वर्षे वास्तव्याचा अधिकृत दाखला.",
            },
            {
                "code": "HSC_MARKSHEET",
                "nameEn": "HSC (Class 12) / Qualifying Marksheet",
                "nameMr": "इ. १२ वी गुणपत्रिका",
                "issuingAuthorityEn": "MSBSHSE / Respective Board",
                "issuingAuthorityMr": "महाराष्ट्र राज्य माध्यमिक व उच्च माध्यमिक शिक्षण मंडळ",
                "instructionsEn": "Candidate name must match Aadhaar UID.",
                "instructionsMr": "विद्यार्थ्याचे नाव आधार कार्डाशी जुळणे आवश्यक.",
            },
            {
                "code": "COLLEGE_BONAFIDE",
                "nameEn": "College Admission Fee Receipt & Bonafide",
                "nameMr": "महाविद्यालय प्रवेश फी पावती व बोनाफाईड",
                "issuingAuthorityEn": "College Principal / Registrar",
                "issuingAuthorityMr": "प्राचार्य / कुलसचिव (उदा. COEP Tech)",
                "instructionsEn": "Current academic year CAP receipt with allotment.",
                "instructionsMr": "चालू शैक्षणिक वर्षाची अधिकृत प्रवेश फी पावती.",
            },
            {
                "code": "RATION_CARD",
                "nameEn": "Maharashtra Smart Ration Card",
                "nameMr": "महाराष्ट्र स्मार्ट रेशन कार्ड",
                "issuingAuthorityEn": "Food & Civil Supplies Department",
                "issuingAuthorityMr": "अन्न, नागरी पुरवठा व ग्राहक संरक्षण विभाग",
                "instructionsEn": "Must verify compliance with 2-child family norm.",
                "instructionsMr": "२-अपत्य नियमाच्या पडताळणीसाठी कुटुंबातील सदस्यांची यादी दर्शवणारे रेशन कार्ड.",
            },
            {
                "code": "AADHAAR_CARD",
                "nameEn": "Aadhaar Card (UIDAI Linked & Masked)",
                "nameMr": "आधार कार्ड (बँक सीडेड व मास्क केलेले)",
                "issuingAuthorityEn": "UIDAI",
                "issuingAuthorityMr": "भारतीय विशिष्ट ओळख प्राधिकरण (UIDAI)",
                "instructionsEn": "NPCI mapper active bank account linkage for direct DBT credit.",
                "instructionsMr": "डीबीटी जमा होण्यासाठी बँक खात्याशी जोडलेले आधार कार्ड.",
            },
        ],
    },
    "spp-sc-02": {
        "schemeNameEn": "Post-Matric Scholarship for Scheduled Caste (SC) Students",
        "schemeNameMr": "अनुसूचित जातीच्या विद्यार्थ्यांसाठी मॅट्रिकोत्तर शिष्यवृत्ती",
        "rulesetStatus": "prototype_unverified",
        "warningEn": "Prototype Rules: SC Post-Matric requirements require formal Social Justice Department confirmation.",
        "warningMr": "प्रोटोटाइप नियम: अनुसूचित जाती मॅट्रिकोत्तर शिष्यवृत्तीसाठी सामाजिक न्याय विभागाच्या शासन निर्णयानुसार पडताळणी आवश्यक.",
        "requiredDocuments": [
            {
                "code": "CASTE_CERT",
                "nameEn": "Caste Certificate (SC)",
                "nameMr": "जात प्रमाणपत्र (SC)",
                "issuingAuthorityEn": "Sub-Divisional Magistrate / Deputy Collector",
                "issuingAuthorityMr": "उपविभागीय दंडाधिकारी / उप जिल्हाधिकारी",
                "instructionsEn": "Competent authority certificate issued in Maharashtra.",
                "instructionsMr": "महाराष्ट्रात सक्षम अधिकाऱ्याने दिलेले अधिकृत जात प्रमाणपत्र.",
            },
            {
                "code": "CASTE_VALIDITY",
                "nameEn": "Caste Validity Certificate",
                "nameMr": "जात वैधता प्रमाणपत्र",
                "issuingAuthorityEn": "Divisional Caste Scrutiny Committee",
                "issuingAuthorityMr": "विभागीय जात पडताळणी समिती",
                "instructionsEn": "Mandatory scrutiny verification number and barcode.",
                "instructionsMr": "पडताळणी समितीचा अधिकृत क्रमांक व दिनांक असणे अनिवार्य.",
            },
            {
                "code": "INCOME_CERT",
                "nameEn": "Income Certificate / Form 16",
                "nameMr": "तहसीलदार उत्पन्नाचा दाखला",
                "issuingAuthorityEn": "Tahsildar / Employer Form 16",
                "issuingAuthorityMr": "तहसीलदार / फॉर्म १६",
                "instructionsEn": "Annual family income must be ≤ ₹2,50,000/-.",
                "instructionsMr": "वार्षिक कौटुंबिक उत्पन्न २.५ लाख रुपयांपेक्षा कमी असल्याचा दाखला.",
            },
            {
                "code": "DOMICILE_CERT",
                "nameEn": "Maharashtra Domicile Certificate",
                "nameMr": "महाराष्ट्र अधिवास प्रमाणपत्र",
                "issuingAuthorityEn": "Executive Magistrate / Tahsildar",
                "issuingAuthorityMr": "कार्यकारी दंडाधिकारी / तहसीलदार",
                "instructionsEn": "Original scanned copy.",
                "instructionsMr": "मूळ स्कॅन केलेली प्रत.",
            },
        ],
    },
    "spp-obc-03": {
        "schemeNameEn": "Post-Matric Scholarship for OBC / VJNT / SBC Students",
        "schemeNameMr": "इतर मागास वर्ग (OBC), विमुक्त जाती व भटक्या जमाती (VJNT) शिष्यवृत्ती",
        "rulesetStatus": "prototype_unverified",
        "warningEn": "Prototype Rules: Non-Creamy Layer (NCL) validity dates must be cross-checked with the VJNT & OBC Department.",
        "warningMr": "प्रोटोटाइप नियम: नॉन-क्रिमी लेयर (NCL) वैधता कालावधी बहुजन कल्याण विभागाच्या नियमांनुसार पडताळणे आवश्यक.",
        "requiredDocuments": [
            {
                "code": "CASTE_CERT",
                "nameEn": "Caste Certificate (OBC/VJNT)",
                "nameMr": "जात प्रमाणपत्र (OBC/VJNT)",
                "issuingAuthorityEn": "Sub-Divisional Magistrate",
                "issuingAuthorityMr": "उपविभागीय दंडाधिकारी",
                "instructionsEn": "Valid Maharashtra state caste certificate.",
                "instructionsMr": "महाराष्ट्र राज्य शासन मान्य जात प्रमाणपत्र.",
            },
            {
                "code": "NCL_CERT",
                "nameEn": "Non-Creamy Layer (NCL) Certificate",
                "nameMr": "नॉन-क्रिमीलेअर प्रमाणपत्र",
                "issuingAuthorityEn": "Sub-Divisional Officer / Tahsildar",
                "issuingAuthorityMr": "उपविभागीय अधिकारी / तहसीलदार",
                "instructionsEn": "Must be valid through 31st March 2025.",
                "instructionsMr": "३१ मार्च २०२५ पर्यंत वैध असणारे नॉन-क्रिमीलेअर प्रमाणपत्र.",
            },
            {
                "code": "INCOME_CERT",
                "nameEn": "Tahsildar Income Certificate",
                "nameMr": "उत्पन्नाचा दाखला",
                "issuingAuthorityEn": "Tahsildar",
                "issuingAuthorityMr": "तहसीलदार",
                "instructionsEn": "Barcoded digital certificate.",
                "instructionsMr": "बारकोड असलेला डिजिटल दाखला.",
            },
        ],
    },
    "spp-st-04": {
        "schemeNameEn": "Post-Matric Scholarship Scheme for Scheduled Tribes (ST)",
        "schemeNameMr": "अनुसूचित जमातीच्या विद्यार्थ्यांसाठी मॅट्रिकोत्तर शिष्यवृत्ती",
        "rulesetStatus": "prototype_unverified",
        "warningEn": "Prototype Rules: Tribe Scrutiny Committee requirements require verification with Tribal Development Department.",
        "warningMr": "प्रोटोटाइप नियम: आदिवासी विकास विभागाच्या निकषांनुसार जमाती पडताळणीची अधिकृत खात्री आवश्यक.",
        "requiredDocuments": [
            {
                "code": "TRIBE_CERT",
                "nameEn": "Scheduled Tribe Certificate",
                "nameMr": "अनुसूचित जमाती प्रमाणपत्र",
                "issuingAuthorityEn": "Sub-Divisional Officer",
                "issuingAuthorityMr": "उपविभागीय अधिकारी",
                "instructionsEn": "Proof of membership in recognized Scheduled Tribe.",
                "instructionsMr": "अनुसूचित जमाती सदस्यत्वाचा दाखला.",
            },
            {
                "code": "TRIBE_VALIDITY",
                "nameEn": "Tribe Validity Certificate",
                "nameMr": "जमाती वैधता प्रमाणपत्र",
                "issuingAuthorityEn": "Scheduled Tribe Certificate Scrutiny Committee",
                "issuingAuthorityMr": "अनुसूचित जमाती प्रमाणपत्र पडताळणी समिती",
                "instructionsEn": "Mandatory scrutiny certificate.",
                "instructionsMr": "पडताळणी समितीचा अधिकृत दाखला.",
            },
        ],
    },
}

# ---------------------------------------------------------------------------
# Models
# ---------------------------------------------------------------------------
class DocumentSpec(BaseModel):
    code: str
    nameEn: str
    nameMr: str
    issuingAuthorityEn: str
    issuingAuthorityMr: str
    instructionsEn: str
    instructionsMr: str


class ValidateRequest(BaseModel):
    schemeId: str = Field(..., description="Targeted scholarship scheme ID, e.g. 'spp-ebc-01'")
    documentCodes: List[str] = Field(default_factory=list, description="List of document type codes attached by student")
    language: Optional[str] = Field(default="en", description="Preferred response language ('en' or 'mr')")


class ValidateResponse(BaseModel):
    schemeId: str
    schemeNameEn: str
    schemeNameMr: str
    rulesetStatus: str = "prototype_unverified"
    warningEn: str
    warningMr: str
    requiredDocumentCodes: List[str]
    presentDocumentCodes: List[str]
    missingDocumentCodes: List[str]
    isReady: bool
    summaryEn: str
    summaryMr: str
    missingDocuments: List[DocumentSpec]
    presentDocuments: List[DocumentSpec]
    disclaimerEn: str
    disclaimerMr: str


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------
@app.get("/")
def root():
    return {
        "app": "MahaScholar Guard",
        "message": "Backend is running.",
    }


@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "service": "mahascholar-guard-api",
        "version": "0.2.0",
    }


@app.post("/api/validate", response_model=ValidateResponse)
def validate_documents(payload: ValidateRequest):
    """
    Validates document presence against deterministic scheme rules.
    Privacy guarantee: Only document codes and scheme ID are processed.
    No file contents or personal student data are accepted or logged.
    """
    scheme_id = (payload.schemeId or "").strip()
    if not scheme_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Field 'schemeId' is required and cannot be empty.",
        )

    scheme_rule = SCHEME_RULES.get(scheme_id)
    if not scheme_rule:
        valid_schemes = list(SCHEME_RULES.keys())
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Scheme '{scheme_id}' is not recognized. Valid schemes: {', '.join(valid_schemes)}",
        )

    # Deduplicate provided document codes cleanly
    present_set = {code.strip() for code in payload.documentCodes if code and isinstance(code, str)}
    required_specs = [DocumentSpec(**d) for d in scheme_rule["requiredDocuments"]]
    required_codes = [d.code for d in required_specs]

    present_specs = [d for d in required_specs if d.code in present_set]
    missing_specs = [d for d in required_specs if d.code not in present_set]

    present_codes = [d.code for d in present_specs]
    missing_codes = [d.code for d in missing_specs]

    is_ready = len(missing_codes) == 0

    if is_ready:
        summary_en = f"All {len(required_codes)} required documents are present for {scheme_rule['schemeNameEn']}."
        summary_mr = f"{scheme_rule['schemeNameMr']} साठी आवश्यक असलेली सर्व {len(required_codes)} कागदपत्रे जोडली आहेत."
    else:
        summary_en = f"{len(missing_codes)} of {len(required_codes)} required document(s) are missing for {scheme_rule['schemeNameEn']}."
        summary_mr = f"{scheme_rule['schemeNameMr']} साठी आवश्यक {len(required_codes)} पैकी {len(missing_codes)} कागदपत्र(े) अद्याप जोडलेली नाहीत."

    disclaimer_en = (
        "This is an automated advisory readiness check based on prototype rules and does NOT constitute "
        "an official eligibility approval or government verification by MahaDBT."
    )
    disclaimer_mr = (
        "हे स्वयंचलित कागदपत्र पूर्वतयारी तपासणी प्रोटोटाइप साधन आहे; हा अधिकृत शासकीय पात्रता निर्णय "
        "किंवा महाडीबीटी (MahaDBT) ची अधिकृत मान्यता नाही."
    )

    return ValidateResponse(
        schemeId=scheme_id,
        schemeNameEn=scheme_rule["schemeNameEn"],
        schemeNameMr=scheme_rule["schemeNameMr"],
        rulesetStatus=scheme_rule["rulesetStatus"],
        warningEn=scheme_rule["warningEn"],
        warningMr=scheme_rule["warningMr"],
        requiredDocumentCodes=required_codes,
        presentDocumentCodes=present_codes,
        missingDocumentCodes=missing_codes,
        isReady=is_ready,
        summaryEn=summary_en,
        summaryMr=summary_mr,
        missingDocuments=missing_specs,
        presentDocuments=present_specs,
        disclaimerEn=disclaimer_en,
        disclaimerMr=disclaimer_mr,
    )


@app.post("/api/validate", response_model=ValidateResponse)
def validate_documents(payload: ValidateRequest):
    """
    Validates document presence against deterministic scheme rules.
    Privacy guarantee: Only document codes and scheme ID are processed.
    No file contents or personal student data are accepted or logged.
    """
    scheme_id = (payload.schemeId or "").strip()
    if not scheme_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Field 'schemeId' is required and cannot be empty.",
        )

    scheme_rule = SCHEME_RULES.get(scheme_id)
    if not scheme_rule:
        valid_schemes = list(SCHEME_RULES.keys())
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Scheme '{scheme_id}' is not recognized. Valid schemes: {', '.join(valid_schemes)}",
        )

    # Deduplicate provided document codes cleanly
    present_set = {code.strip() for code in payload.documentCodes if code and isinstance(code, str)}
    required_specs = [DocumentSpec(**d) for d in scheme_rule["requiredDocuments"]]
    required_codes = [d.code for d in required_specs]

    present_specs = [d for d in required_specs if d.code in present_set]
    missing_specs = [d for d in required_specs if d.code not in present_set]

    present_codes = [d.code for d in present_specs]
    missing_codes = [d.code for d in missing_specs]

    is_ready = len(missing_codes) == 0

    if is_ready:
        summary_en = f"All {len(required_codes)} required documents are present for {scheme_rule['schemeNameEn']}."
        summary_mr = f"{scheme_rule['schemeNameMr']} साठी आवश्यक असलेली सर्व {len(required_codes)} कागदपत्रे जोडली आहेत."
    else:
        summary_en = f"{len(missing_codes)} of {len(required_codes)} required document(s) are missing for {scheme_rule['schemeNameEn']}."
        summary_mr = f"{scheme_rule['schemeNameMr']} साठी आवश्यक {len(required_codes)} पैकी {len(missing_codes)} कागदपत्र(े) अद्याप जोडलेली नाहीत."

    disclaimer_en = (
        "This is an automated advisory readiness check based on prototype rules and does NOT constitute "
        "an official eligibility approval or government verification by MahaDBT."
    )
    disclaimer_mr = (
        "हे स्वयंचलित कागदपत्र पूर्वतयारी तपासणी प्रोटोटाइप साधन आहे; हा अधिकृत शासकीय पात्रता निर्णय "
        "किंवा महाडीबीटी (MahaDBT) ची अधिकृत मान्यता नाही."
    )

    return ValidateResponse(
        schemeId=scheme_id,
        schemeNameEn=scheme_rule["schemeNameEn"],
        schemeNameMr=scheme_rule["schemeNameMr"],
        rulesetStatus=scheme_rule["rulesetStatus"],
        warningEn=scheme_rule["warningEn"],
        warningMr=scheme_rule["warningMr"],
        requiredDocumentCodes=required_codes,
        presentDocumentCodes=present_codes,
        missingDocumentCodes=missing_codes,
        isReady=is_ready,
        summaryEn=summary_en,
        summaryMr=summary_mr,
        missingDocuments=missing_specs,
        presentDocuments=present_specs,
        disclaimerEn=disclaimer_en,
        disclaimerMr=disclaimer_mr,
    )

