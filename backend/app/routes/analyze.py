from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.scam_detector import analyze_content


router = APIRouter(
    prefix="/api",
    tags=["Analysis"]
)


class AnalyzeRequest(BaseModel):
    content: str
    content_type: str = "message"


@router.post("/analyze")
def analyze(request: AnalyzeRequest):

    if not request.content.strip():
        raise HTTPException(
            status_code=400,
            detail="Content cannot be empty."
        )

    result = analyze_content(
        request.content,
        request.content_type
    )

    return {
        "success": True,
        "data": result
    }