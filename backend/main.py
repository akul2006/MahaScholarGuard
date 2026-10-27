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
