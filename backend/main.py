import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="MahaScholar Guard API",
    description="Backend API for scholarship document readiness checks.",
    version="0.1.0",
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
    allow_methods=["GET", "OPTIONS"],
    allow_headers=["Content-Type", "Accept"],
)


# Prototype catalogue metadata only. Detailed document requirements remain in the
# frontend prototype until they are reviewed against current official scheme rules.
SCHEME_CATALOG = [
    {
        "id": "spp-ebc-01",
        "code": "RJC-SHAHU-EBC",
        "nameEn": "Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Yojna (EBC)",
        "nameMr": "राजर्षी छत्रपती शाहू महाराज शिक्षण शुल्क शिष्यवृत्ती योजना (ईबीसी)",
        "departmentEn": "Higher & Technical Education Department (DTE/DHE)",
        "departmentMr": "उच्च व तंत्रशिक्षण विभाग",
        "category": "EBC",
        "officialPortalUrl": "https://mahadbt.maharashtra.gov.in",
        "catalogStatus": "prototype_unverified",
    },
    {
        "id": "spp-sc-02",
        "code": "POST-MATRIC-SC",
        "nameEn": "Post-Matric Scholarship for Scheduled Caste (SC) Students",
        "nameMr": "अनुसूचित जातीच्या विद्यार्थ्यांसाठी मॅट्रिकोत्तर शिष्यवृत्ती",
        "departmentEn": "Social Justice & Special Assistance Department",
        "departmentMr": "सामाजिक न्याय व विशेष सहाय्य विभाग",
        "category": "SC",
        "officialPortalUrl": "https://mahadbt.maharashtra.gov.in",
        "catalogStatus": "prototype_unverified",
    },
    {
        "id": "spp-obc-03",
        "code": "POST-MATRIC-OBC",
        "nameEn": "Post-Matric Scholarship for OBC / VJNT / SBC Students",
        "nameMr": "इतर मागास वर्ग (OBC), विमुक्त जाती व भटक्या जमाती (VJNT) शिष्यवृत्ती",
        "departmentEn": "VJNT, OBC & SBC Welfare Department",
        "departmentMr": "इतर मागास बहुजन कल्याण विभाग",
        "category": "OBC",
        "officialPortalUrl": "https://mahadbt.maharashtra.gov.in",
        "catalogStatus": "prototype_unverified",
    },
    {
        "id": "spp-st-04",
        "code": "POST-MATRIC-ST",
        "nameEn": "Post-Matric Scholarship Scheme for Scheduled Tribes (ST)",
        "nameMr": "अनुसूचित जमातीच्या विद्यार्थ्यांसाठी मॅट्रिकोत्तर शिष्यवृत्ती",
        "departmentEn": "Tribal Development Department",
        "departmentMr": "आदिवासी विकास विभाग",
        "category": "ST",
        "officialPortalUrl": "https://mahadbt.maharashtra.gov.in",
        "catalogStatus": "prototype_unverified",
    },
]


@app.get("/api/schemes")
def list_scholarship_schemes():
    """Return prototype scheme catalogue metadata; not an official eligibility source."""
    return {
        "items": SCHEME_CATALOG,
        "count": len(SCHEME_CATALOG),
        "catalogStatus": "prototype_unverified",
    }


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
        "version": "0.1.0",
    }
