import { Link } from "react-router-dom";
import {
  ShieldCheck,
  ArrowLeft,
  Activity,
  AlertTriangle,
  ShieldAlert,
  Search,
  TrendingUp,
  Globe,
  Briefcase,
  CreditCard,
  Gift,
} from "lucide-react";

const threats = [
  {
    name: "Job Scams",
    percentage: 86,
    icon: Briefcase,
  },
  {
    name: "Phishing",
    percentage: 74,
    icon: Globe,
  },
  {
    name: "Payment Scams",
    percentage: 68,
    icon: CreditCard,
  },
  {
    name: "Prize / Lottery",
    percentage: 52,
    icon: Gift,
  },
];

const recentThreats = [
  {
    type: "Job Scam",
    risk: "HIGH",
    score: 94,
    icon: Briefcase,
  },
  {
    type: "Phishing",
    risk: "HIGH",
    score: 88,
    icon: Globe,
  },
  {
    type: "Payment Scam",
    risk: "MEDIUM",
    score: 61,
    icon: CreditCard,
  },
  {
    type: "Normal Message",
    risk: "SAFE",
    score: 4,
    icon: ShieldCheck,
  },
];

function Dashboard() {
  return (
    <div className="dashboard-page">

      {/* Navigation */}
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
          Home
        </Link>

      </nav>

      <main className="insights-container">

        {/* Header */}
        <div className="insights-heading">

          <div>
            <div className="analyzer-badge">
              <Activity size={14} />
              SECURITY INSIGHTS
            </div>

            <h1>
              Scam threat
              <span> intelligence.</span>
            </h1>

            <p>
              A visual overview of common scam patterns detected
              by the ScamShield analysis engine.
            </p>
          </div>

          <Link
            to="/analyze"
            className="primary-button"
          >
            <Search size={17} />
            New Analysis
          </Link>

        </div>

        {/* Demo Notice */}
        <div className="demo-notice">
          <TrendingUp size={16} />

          <span>
            Demonstration insights based on representative
            threat-analysis scenarios.
          </span>
        </div>

        {/* Statistics */}
        <section className="insight-stats">

          <div className="insight-stat">
            <Activity size={20} />

            <span>Threat Patterns</span>

            <strong>8+</strong>

            <small>
              Detection signals
            </small>
          </div>

          <div className="insight-stat danger">
            <ShieldAlert size={20} />

            <span>High-Risk Signals</span>

            <strong>5</strong>

            <small>
              Critical combinations
            </small>
          </div>

          <div className="insight-stat warning">
            <AlertTriangle size={20} />

            <span>Threat Categories</span>

            <strong>7</strong>

            <small>
              Scam classifications
            </small>
          </div>

          <div className="insight-stat safe">
            <ShieldCheck size={20} />

            <span>Protection Actions</span>

            <strong>12+</strong>

            <small>
              Safety recommendations
            </small>
          </div>

        </section>

        {/* Main Grid */}
        <section className="insights-grid">

          {/* Threat Distribution */}
          <div className="insight-panel">

            <div className="panel-heading">
              <div>
                <h2>Threat Pattern Distribution</h2>

                <p>
                  Relative detection strength across categories.
                </p>
              </div>
            </div>

            <div className="threat-list">

              {threats.map((threat) => {

                const Icon = threat.icon;

                return (
                  <div
                    className="threat-item"
                    key={threat.name}
                  >

                    <div className="threat-info">

                      <div className="threat-icon">
                        <Icon size={16} />
                      </div>

                      <span>
                        {threat.name}
                      </span>

                    </div>

                    <div className="threat-bar-container">

                      <div className="threat-bar">

                        <div
                          className="threat-bar-fill"
                          style={{
                            width: `${threat.percentage}%`,
                          }}
                        />

                      </div>

                      <strong>
                        {threat.percentage}%
                      </strong>

                    </div>

                  </div>
                );
              })}

            </div>

          </div>

          {/* Detection Logic */}
          <div className="insight-panel">

            <div className="panel-heading">

              <div>
                <h2>Detection Layers</h2>

                <p>
                  How ScamShield evaluates content.
                </p>
              </div>

            </div>

            <div className="detection-layers">

              <div className="detection-layer">
                <span>01</span>

                <div>
                  <strong>
                    Pattern Detection
                  </strong>

                  <p>
                    Identifies suspicious words,
                    requests and phrases.
                  </p>
                </div>
              </div>

              <div className="detection-layer">
                <span>02</span>

                <div>
                  <strong>
                    Context Analysis
                  </strong>

                  <p>
                    Connects multiple warning signals
                    instead of relying on one keyword.
                  </p>
                </div>
              </div>

              <div className="detection-layer">
                <span>03</span>

                <div>
                  <strong>
                    Risk Scoring
                  </strong>

                  <p>
                    Converts detected signals into
                    a 0–100 risk score.
                  </p>
                </div>
              </div>

              <div className="detection-layer">
                <span>04</span>

                <div>
                  <strong>
                    Safety Recommendation
                  </strong>

                  <p>
                    Gives the user a practical next
                    step based on the detected threat.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </section>

        {/* Recent Analysis */}
        <section className="insight-panel recent-panel">

          <div className="panel-heading">

            <div>
              <h2>Example Threat Analysis</h2>

              <p>
                Representative examples from the detection engine.
              </p>
            </div>

          </div>

          <div className="recent-threat-list">

            {recentThreats.map((item) => {

              const Icon = item.icon;

              return (
                <div
                  className="recent-threat"
                  key={item.type}
                >

                  <div className="recent-threat-icon">
                    <Icon size={17} />
                  </div>

                  <div className="recent-threat-name">
                    <strong>
                      {item.type}
                    </strong>

                    <span>
                      Automated risk assessment
                    </span>
                  </div>

                  <div
                    className={`recent-risk ${item.risk.toLowerCase()}`}
                  >
                    {item.risk}
                  </div>

                  <div className="recent-score">
                    {item.score}
                    <span>/100</span>
                  </div>

                </div>
              );
            })}

          </div>

        </section>

        {/* CTA */}
        <section className="insights-cta">

          <div>
            <p>HAVE SOMETHING SUSPICIOUS?</p>

            <h2>
              Check it before
              <span> you trust it.</span>
            </h2>
          </div>

          <Link
            to="/analyze"
            className="primary-button"
          >
            Start Analysis
            <Search size={17} />
          </Link>

        </section>

      </main>
    </div>
  );
}

export default Dashboard;