
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="MahaScholar Guard API",
    description="Backend API for scholarship document readiness checks.",
    version="0.1.0",
)

# Development only: allow the local Vite frontend.
# Add or change origins if your frontend uses a different port.
allowed_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=False,
    allow_methods=["GET"],
    allow_headers=["Content-Type"],
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
