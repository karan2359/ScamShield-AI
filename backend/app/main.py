from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.analyze import router as analyze_router


app = FastAPI(
    title="ScamShield AI API",
    description="AI-powered scam and phishing detection API",
    version="1.0.0",
)


# Allow React frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(analyze_router)


@app.get("/")
def root():
    return {
        "message": "ScamShield AI API is running",
        "status": "online",
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }