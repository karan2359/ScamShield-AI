import re


SCAM_PATTERNS = {
    "payment_request": {
        "keywords": [
            "pay",
            "payment",
            "registration fee",
            "processing fee",
            "deposit",
            "send money",
            "transfer money",
            "₹",
            "rs.",
            "rupees",
        ],
        "weight": 20,
        "label": "Payment or money request",
    },

    "urgency": {
        "keywords": [
            "immediately",
            "urgent",
            "act now",
            "today",
            "within 24 hours",
            "last chance",
            "expires today",
            "right now",
        ],
        "weight": 15,
        "label": "Urgency or pressure language",
    },

    "credential_request": {
        "keywords": [
            "otp",
            "password",
            "pin",
            "cvv",
            "bank details",
            "account number",
            "login details",
            "verification code",
        ],
        "weight": 25,
        "label": "Sensitive information request",
    },

    "job_scam": {
        "keywords": [
            "work from home",
            "registration fee",
            "job offer",
            "selected for the job",
            "earn ₹",
            "salary",
            "part time job",
            "easy job",
            "guaranteed income",
        ],
        "weight": 20,
        "label": "Suspicious employment offer",
    },

    "prize_scam": {
        "keywords": [
            "congratulations",
            "you won",
            "winner",
            "lottery",
            "prize",
            "reward",
            "lucky winner",
            "claim your prize",
        ],
        "weight": 20,
        "label": "Prize or reward claim",
    },

    "phishing": {
        "keywords": [
            "verify your account",
            "click this link",
            "click here",
            "account suspended",
            "account blocked",
            "confirm your account",
            "login immediately",
            "security alert",
        ],
        "weight": 20,
        "label": "Possible phishing attempt",
    },

    "investment_scam": {
        "keywords": [
            "guaranteed return",
            "double your money",
            "investment opportunity",
            "high return",
            "profit guaranteed",
            "crypto investment",
            "risk free investment",
        ],
        "weight": 25,
        "label": "Suspicious investment promise",
    },
}


def normalize_text(text: str) -> str:
    return re.sub(r"\s+", " ", text.lower().strip())


def detect_category(matches):
    categories = {
        "job_scam": "Job Scam",
        "phishing": "Phishing",
        "investment_scam": "Investment Scam",
        "prize_scam": "Prize / Lottery Scam",
        "credential_request": "Credential Theft",
        "payment_request": "Payment Scam",
        "urgency": "Suspicious Activity",
        "suspicious_url": "Suspicious URL",
    }

    if not matches:
        return "No Major Threat Detected"

    # Give category priority based on strongest individual pattern.
    strongest = max(
        matches,
        key=lambda item: item["score"]
    )

    return categories.get(
        strongest["type"],
        "Suspicious Activity"
    )


def analyze_content(content: str, content_type: str = "message"):
    text = normalize_text(content)

    if not text:
        return {
            "risk_score": 0,
            "risk_level": "UNKNOWN",
            "category": "No Input",
            "red_flags": [],
            "explanation": "No content was provided for analysis.",
            "recommendation": "Enter suspicious content and try again.",
        }

    matches = []
    total_score = 0

    # =========================================
    # BASIC PATTERN DETECTION
    # =========================================

    for pattern_type, pattern_data in SCAM_PATTERNS.items():

        matched_keywords = []

        for keyword in pattern_data["keywords"]:
            if keyword.lower() in text:
                matched_keywords.append(keyword)

        if matched_keywords:
            score = pattern_data["weight"]

            matches.append({
                "type": pattern_type,
                "label": pattern_data["label"],
                "keywords": matched_keywords,
                "score": score,
            })

            total_score += score

    # =========================================
    # URL ANALYSIS
    # =========================================

    if content_type == "url":

        suspicious_url_words = [
            "login",
            "verify",
            "secure",
            "account",
            "update",
            "claim",
            "free",
        ]

        url_matches = [
            word
            for word in suspicious_url_words
            if word in text
        ]

        if url_matches:
            matches.append({
                "type": "suspicious_url",
                "label": "Suspicious URL indicators",
                "keywords": url_matches,
                "score": 20,
            })

            total_score += 20

    # =========================================
    # CONTEXT DETECTION
    # =========================================

    has_payment = any(
        keyword.lower() in text
        for keyword in SCAM_PATTERNS["payment_request"]["keywords"]
    )

    has_job = any(
        keyword.lower() in text
        for keyword in SCAM_PATTERNS["job_scam"]["keywords"]
    )

    has_prize = any(
        keyword.lower() in text
        for keyword in SCAM_PATTERNS["prize_scam"]["keywords"]
    )

    has_urgency = any(
        keyword.lower() in text
        for keyword in SCAM_PATTERNS["urgency"]["keywords"]
    )

    has_credentials = any(
        keyword.lower() in text
        for keyword in SCAM_PATTERNS["credential_request"]["keywords"]
    )

    has_phishing = any(
        keyword.lower() in text
        for keyword in SCAM_PATTERNS["phishing"]["keywords"]
    )

    has_investment = any(
        keyword.lower() in text
        for keyword in SCAM_PATTERNS["investment_scam"]["keywords"]
    )

    # =========================================
    # STRONG COMBINATION DETECTION
    # =========================================

    # Job + payment = very strong job scam signal
    if has_job and has_payment:
        total_score += 30

        matches.append({
            "type": "job_payment_combination",
            "label": "Job offer combined with payment request",
            "keywords": [],
            "score": 30,
        })

    # Prize + payment = common prize scam pattern
    if has_prize and has_payment:
        total_score += 30

        matches.append({
            "type": "prize_payment_combination",
            "label": "Prize claim combined with payment request",
            "keywords": [],
            "score": 30,
        })

    # Phishing + credentials = dangerous combination
    if has_phishing and has_credentials:
        total_score += 30

        matches.append({
            "type": "phishing_credentials_combination",
            "label": "Phishing attempt requesting sensitive information",
            "keywords": [],
            "score": 30,
        })

    # Investment + payment = suspicious financial activity
    if has_investment and has_payment:
        total_score += 25

        matches.append({
            "type": "investment_payment_combination",
            "label": "Investment promise combined with payment request",
            "keywords": [],
            "score": 25,
        })

    # Urgency + payment = pressure to transfer money
    if has_urgency and has_payment:
        total_score += 15

        matches.append({
            "type": "urgency_payment_combination",
            "label": "Urgency combined with payment request",
            "keywords": [],
            "score": 15,
        })

    # Urgency + credentials = pressure to reveal information
    if has_urgency and has_credentials:
        total_score += 20

        matches.append({
            "type": "urgency_credentials_combination",
            "label": "Urgency combined with sensitive information request",
            "keywords": [],
            "score": 20,
        })

    # =========================================
    # FINANCIAL PROMISE DETECTION
    # =========================================

    financial_promise_patterns = [
        "earn ₹",
        "guaranteed income",
        "guaranteed profit",
        "double your money",
        "easy money",
        "instant income",
        "₹50000",
        "₹50,000",
    ]

    financial_promise = any(
        pattern.lower() in text
        for pattern in financial_promise_patterns
    )

    if financial_promise:
        total_score += 10

        matches.append({
            "type": "financial_promise",
            "label": "Unrealistic financial promise",
            "keywords": [],
            "score": 10,
        })

    # =========================================
    # MULTIPLE RED FLAGS BONUS
    # =========================================

    unique_pattern_count = len(matches)

    if unique_pattern_count >= 4:
        total_score += 10

    elif unique_pattern_count >= 3:
        total_score += 5

    # =========================================
    # FINAL SCORE
    # =========================================

    risk_score = min(total_score, 100)

    # =========================================
    # RISK LEVEL
    # =========================================

    if risk_score >= 70:
        risk_level = "HIGH"

    elif risk_score >= 40:
        risk_level = "MEDIUM"

    elif risk_score >= 15:
        risk_level = "LOW"

    else:
        risk_level = "SAFE"

    # =========================================
    # CATEGORY
    # =========================================

    category = detect_category(matches)

    # =========================================
    # RED FLAGS
    # =========================================

    red_flags = []

    for match in matches:

        if match["label"] not in red_flags:
            red_flags.append(match["label"])

    # =========================================
    # EXPLANATION + RECOMMENDATION
    # =========================================

    if risk_score >= 70:

        explanation = (
            "This content contains multiple indicators commonly "
            "associated with scams or fraudulent activity. "
            "Several warning signals were detected together, "
            "which significantly increases the risk level."
        )

        recommendation = (
            "Do not send money, OTPs, passwords, banking details, "
            "or identity documents. Do not click suspicious links. "
            "Verify the sender through an official and trusted source."
        )

    elif risk_score >= 40:

        explanation = (
            "Some suspicious characteristics were detected. "
            "The content should be verified carefully before "
            "you take any action."
        )

        recommendation = (
            "Avoid clicking unknown links or sharing sensitive "
            "information until the source has been independently verified."
        )

    elif risk_score >= 15:

        explanation = (
            "A few potentially suspicious indicators were found, "
            "but there is not enough evidence to classify this as "
            "a high-risk scam."
        )

        recommendation = (
            "Stay cautious and verify the sender before taking action."
        )

    else:

        explanation = (
            "No major scam indicators were detected in the provided "
            "content."
        )

        recommendation = (
            "Continue to verify important requests through trusted sources."
        )

    # =========================================
    # FINAL RESPONSE
    # =========================================

    return {
        "risk_score": risk_score,
        "risk_level": risk_level,
        "category": category,
        "red_flags": red_flags,
        "explanation": explanation,
        "recommendation": recommendation,
    }