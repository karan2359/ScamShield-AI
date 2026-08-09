import { Link } from "react-router-dom";
import {
  ShieldCheck,
  ArrowLeft,
  MessageSquareText,
  Brain,
  Gauge,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquareText,
    title: "Submit Suspicious Content",
    description:
      "Paste a suspicious message, URL, email, or job offer into ScamShield AI.",
  },
  {
    number: "02",
    icon: Brain,
    title: "Analyze the Content",
    description:
      "Our detection engine examines patterns, keywords, requests, urgency, and suspicious combinations.",
  },
  {
    number: "03",
    icon: Gauge,
    title: "Calculate Risk",
    description:
      "Multiple warning signals are combined to calculate a risk score from 0 to 100.",
  },
  {
    number: "04",
    icon: AlertTriangle,
    title: "Explain the Threat",
    description:
      "ScamShield identifies the possible scam category and explains the detected red flags.",
  },
  {
    number: "05",
    icon: CheckCircle,
    title: "Take Safer Action",
    description:
      "Users receive practical recommendations before clicking, paying, or sharing sensitive information.",
  },
];

function HowItWorks() {
  return (
    <div className="how-page">

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

      <main className="how-container">

        <div className="how-heading">

          <div className="analyzer-badge">
            <ShieldCheck size={14} />
            HOW SCAMSHIELD WORKS
          </div>

          <h1>
            Understand the
            <span> protection.</span>
          </h1>

          <p>
            ScamShield transforms suspicious content into a clear
            security decision using layered threat detection.
          </p>

        </div>

        <section className="steps-container">

          {steps.map((step) => {

            const Icon = step.icon;

            return (
              <div className="how-step" key={step.number}>

                <div className="step-number">
                  {step.number}
                </div>

                <div className="step-icon">
                  <Icon size={22} />
                </div>

                <div className="step-content">
                  <h2>{step.title}</h2>

                  <p>{step.description}</p>
                </div>

              </div>
            );
          })}

        </section>

        <section className="how-bottom">

          <div>
            <p>READY TO CHECK SOMETHING?</p>

            <h2>
              Don't guess.
              <br />
              <span>Analyze it.</span>
            </h2>
          </div>

          <Link to="/analyze" className="primary-button">
            Start Analysis
            <ArrowRight size={18} />
          </Link>

        </section>

      </main>
    </div>
  );
}

export default HowItWorks;