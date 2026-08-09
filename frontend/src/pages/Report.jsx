import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  ArrowLeft,
  Flag,
  Send,
  CheckCircle,
} from "lucide-react";

function Report() {

  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    type: "Job Scam",
    content: "",
    url: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.content.trim()) return;

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="report-page">

        <nav className="analyze-navbar">
          <Link to="/" className="brand">
            <div className="brand-icon">
              <ShieldCheck size={23} />
            </div>

            <span>
              ScamShield<span> AI</span>
            </span>
          </Link>
        </nav>

        <main className="success-container">

          <div className="success-icon">
            <CheckCircle size={35} />
          </div>

          <p>REPORT SUBMITTED</p>

          <h1>
            Thank you for
            <span> helping.</span>
          </h1>

          <p className="success-text">
            Your report can help improve awareness of
            suspicious online activity.
          </p>

          <div className="success-actions">

            <Link to="/analyze" className="primary-button">
              Analyze Something
            </Link>

            <Link to="/" className="secondary-button">
              Back to Home
            </Link>

          </div>

        </main>

      </div>
    );
  }

  return (
    <div className="report-page">

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

      <main className="report-container">

        <div className="report-heading">

          <div className="analyzer-badge">
            <Flag size={14} />
            REPORT SUSPICIOUS ACTIVITY
          </div>

          <h1>
            Help make the
            <span> internet safer.</span>
          </h1>

          <p>
            Found a suspicious message or scam? Share it
            with us to help improve scam awareness.
          </p>

        </div>

        <form
          className="report-card"
          onSubmit={handleSubmit}
        >

          <label>Scam Type</label>

          <select
            value={form.type}
            onChange={(e) =>
              setForm({
                ...form,
                type: e.target.value,
              })
            }
          >
            <option>Job Scam</option>
            <option>Phishing</option>
            <option>Payment Scam</option>
            <option>Banking Scam</option>
            <option>Investment Scam</option>
            <option>Prize / Lottery Scam</option>
            <option>Impersonation</option>
            <option>Other</option>
          </select>

          <label>Suspicious Content</label>

          <textarea
            value={form.content}
            onChange={(e) =>
              setForm({
                ...form,
                content: e.target.value,
              })
            }
            placeholder="Paste the suspicious message or describe the scam..."
          />

          <label>
            Suspicious URL
            <span> Optional</span>
          </label>

          <input
            type="text"
            value={form.url}
            onChange={(e) =>
              setForm({
                ...form,
                url: e.target.value,
              })
            }
            placeholder="https://example.com"
          />

          <button
            type="submit"
            className="report-button"
          >
            <Send size={17} />
            Submit Report
          </button>

          <p className="report-note">
            Please do not include passwords, OTPs, or other
            highly sensitive personal information.
          </p>

        </form>

      </main>
    </div>
  );
}

export default Report;