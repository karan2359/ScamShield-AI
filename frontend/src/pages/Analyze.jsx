import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  ArrowLeft,
  MessageSquare,
  Link as LinkIcon,
  Mail,
  BriefcaseBusiness,
  Sparkles,
  Lock,
} from "lucide-react";

const analysisTypes = [
  {
    id: "message",
    label: "Message",
    icon: MessageSquare,
  },
  {
    id: "url",
    label: "URL",
    icon: LinkIcon,
  },
  {
    id: "email",
    label: "Email",
    icon: Mail,
  },
  {
    id: "job",
    label: "Job Offer",
    icon: BriefcaseBusiness,
  },
];

function Analyze() {
  const [activeType, setActiveType] = useState("message");
  const [content, setContent] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const examples = {
    message:
      "Congratulations! You have won ₹50,000. Click this link and pay ₹999 to claim your reward.",
    url: "https://secure-account-verification-example.com/login",
    email:
      "Your bank account will be suspended today. Verify your account immediately using the link below.",
    job:
      "Congratulations! You have been selected for a work-from-home job earning ₹50,000/month. Pay ₹999 registration fee to confirm your position.",
  };

  const placeholders = {
    message:
      "Paste the suspicious SMS, WhatsApp message, or chat message here...",
    url: "Paste the suspicious URL here...",
    email: "Paste the suspicious email content here...",
    job: "Paste the job or internship offer here...",
  };

const handleAnalyze = async () => {
  if (!content.trim()) return;

  setIsAnalyzing(true);
  setError("");
  setResult(null);

  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/analyze",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: content,
          content_type: activeType,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Analysis request failed.");
    }

    const data = await response.json();

    setResult(data.data);
  } catch (error) {
    console.error(error);

    setError(
      "Unable to connect to ScamShield AI. Make sure the backend server is running."
    );
  } finally {
    setIsAnalyzing(false);
  }
};

  const loadExample = () => {
    setContent(examples[activeType]);
  };

  return (
    <div className="analyze-page">

      {/* Navbar */}
      <nav className="analyze-navbar">
        <Link to="/" className="brand">
          <div className="brand-icon">
            <ShieldCheck size={23} />
          </div>

          <span>
            ScamShield<span> AI</span>
          </span>
        </Link>

        <Link to="/" className="back-home">
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </nav>

      {/* Main */}
      <main className="analyzer-container">

        <div className="analyzer-heading">
          <div className="analyzer-badge">
            <Sparkles size={14} />
            AI SECURITY ANALYZER
          </div>

          <h1>
            Check Before
            <span> You Trust.</span>
          </h1>

          <p>
            Paste suspicious content below and ScamShield AI will
            analyze potential warning signs.
          </p>
        </div>

        {/* Analyzer Card */}
        <section className="analyzer-card">

          <div className="card-top">
            <div>
              <h2>What do you want to analyze?</h2>
              <p>Select the type of suspicious content.</p>
            </div>
          </div>

          {/* Type Selector */}
          <div className="analysis-types">
            {analysisTypes.map((type) => {
              const Icon = type.icon;

              return (
                <button
                  key={type.id}
                  className={`type-button ${
                    activeType === type.id ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveType(type.id);
                    setContent("");
                  }}
                >
                  <Icon size={17} />
                  {type.label}
                </button>
              );
            })}
          </div>

          {/* Input */}
          <div className="input-section">

            <div className="input-header">
              <label>
                {activeType === "url"
                  ? "Suspicious URL"
                  : "Suspicious Content"}
              </label>

              <span>{content.length}/3000</span>
            </div>

            <textarea
              value={content}
              onChange={(e) => {
                if (e.target.value.length <= 3000) {
                  setContent(e.target.value);
                }
              }}
              placeholder={placeholders[activeType]}
            />

            <div className="input-footer">
              <button
                className="example-button"
                onClick={loadExample}
              >
                Try an example
              </button>

              <span>
                {content.length > 0
                  ? "Ready to analyze"
                  : "Waiting for input"}
              </span>
            </div>
          </div>

          {/* Analyze */}
          <button
            className="analyze-button"
            onClick={handleAnalyze}
            disabled={!content.trim() || isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <span className="loading-spinner"></span>
                Analyzing...
              </>
            ) : (
              <>
                <ShieldCheck size={19} />
                Analyze with AI
              </>
            )}
          </button>

          {/* Privacy */}
          <div className="privacy-note">
            <Lock size={14} />

            <span>
              Your content is used only for analysis and is not
              displayed publicly.
            </span>
          </div>

        </section>

        {error && (
  <div className="analysis-error">
    {error}
  </div>
)}

{result && (
  <section className="analysis-result">

    <div className="result-header">
      <div>
        <p className="result-label">ANALYSIS COMPLETE</p>

        <h2>
          {result.risk_level === "HIGH"
            ? "High Risk Detected"
            : result.risk_level === "MEDIUM"
            ? "Potential Risk Detected"
            : result.risk_level === "LOW"
            ? "Low Risk"
            : "No Major Threat Detected"}
        </h2>
      </div>

      <div
        className={`risk-score ${result.risk_level.toLowerCase()}`}
      >
        <strong>{result.risk_score}</strong>
        <span>/100</span>
      </div>
    </div>

    <div className="result-category">
      <span>Possible Threat</span>
      <strong>{result.category}</strong>
    </div>

    <div className="result-section">
      <div className="result-section-title">
        🚩 Red Flags
      </div>

      {result.red_flags.length > 0 ? (
        <div className="red-flags">
          {result.red_flags.map((flag, index) => (
            <div className="red-flag" key={index}>
              <span>⚠</span>
              {flag}
            </div>
          ))}
        </div>
      ) : (
        <p className="no-flags">
          No major warning indicators were detected.
        </p>
      )}
    </div>

    <div className="result-section">
      <div className="result-section-title">
        🧠 Why We Flagged This
      </div>

      <p className="result-text">
        {result.explanation}
      </p>
    </div>

    <div className="recommendation-box">
      <div className="result-section-title">
        🛡️ Recommended Action
      </div>

      <p>
        {result.recommendation}
      </p>
    </div>

    <button
      className="analyze-again"
      onClick={() => {
        setResult(null);
        setContent("");
        setError("");
      }}
    >
      Analyze Another
    </button>

  </section>
)}

        {/* Bottom Information */}
        <div className="analyzer-info">

          <div>
            <ShieldCheck size={18} />
            <div>
              <strong>AI-powered detection</strong>
              <p>
                Identify suspicious patterns and potential scam
                indicators.
              </p>
            </div>
          </div>

          <div>
            <Lock size={18} />
            <div>
              <strong>Security focused</strong>
              <p>
                Get practical recommendations before taking action.
              </p>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}

export default Analyze;