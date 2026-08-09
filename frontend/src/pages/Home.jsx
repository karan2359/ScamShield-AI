import { Link } from "react-router-dom";
import {
  ShieldCheck,
  ArrowRight,
  Brain,
  SearchCheck,
  LockKeyhole,
  MessageSquareWarning,
} from "lucide-react";

function Home() {
  return (
    <div className="home-page">

      {/* Navbar */}
      <nav className="navbar">
        <Link to="/" className="brand">
          <div className="brand-icon">
            <ShieldCheck size={25} />
          </div>

          <span>ScamShield<span> AI</span></span>
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/analyze">Analyze</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/how-it-works">How It Works</Link>
        </div>

        <Link to="/analyze" className="nav-button">
          Analyze Now
          <ArrowRight size={17} />
        </Link>
      </nav>

      {/* Hero */}
      <main className="hero">

        <div className="hero-badge">
          <span className="status-dot"></span>
          AI-POWERED SCAM DETECTION
        </div>

        <h1>
          Think Before
          <br />
          <span>You Click.</span>
        </h1>

        <p className="hero-description">
          ScamShield AI analyzes suspicious messages, links and online
          offers to help you identify potential scams before they cost
          you money or personal information.
        </p>

        <div className="hero-actions">
          <Link to="/analyze" className="primary-button">
            Analyze Something
            <ArrowRight size={19} />
          </Link>

          <Link to="/how-it-works" className="secondary-button">
            How It Works
          </Link>
        </div>

        {/* Trust line */}
        <div className="trust-line">
          <ShieldCheck size={17} />
          <span>Built to help you stay one step ahead of scammers.</span>
        </div>

      </main>

      {/* Features */}
      <section className="features-section">

        <div className="section-heading">
          <p>YOUR DIGITAL SAFETY LAYER</p>
          <h2>Detect. Understand. Protect.</h2>
        </div>

        <div className="feature-grid">

          <div className="feature-card">
            <div className="feature-icon">
              <Brain size={24} />
            </div>

            <h3>AI Analysis</h3>

            <p>
              Analyze suspicious content and identify patterns
              commonly associated with scams.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <SearchCheck size={24} />
            </div>

            <h3>Risk Detection</h3>

            <p>
              Get a clear risk score and understand exactly
              why something may be dangerous.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <LockKeyhole size={24} />
            </div>

            <h3>Stay Protected</h3>

            <p>
              Receive practical recommendations before sharing
              information or making a payment.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <MessageSquareWarning size={24} />
            </div>

            <h3>Report Scams</h3>

            <p>
              Report suspicious activity and help build better
              scam awareness for everyone.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">

        <div className="cta-card">
          <div>
            <p className="cta-label">NOT SURE ABOUT A MESSAGE?</p>

            <h2>
              Check it before
              <br />
              you trust it.
            </h2>
          </div>

          <Link to="/analyze" className="primary-button">
            Start Analysis
            <ArrowRight size={19} />
          </Link>
        </div>

      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="brand">
          <div className="brand-icon">
            <ShieldCheck size={20} />
          </div>

          <span>ScamShield<span> AI</span></span>
        </div>

        <p>
          © 2026 ScamShield AI. Think Before You Click.
        </p>
      </footer>

    </div>
  );
}

export default Home;