import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import "../assets/styles/Process.css";           // reuse existing styles

function NewProjectProcess() {
  const navigate = useNavigate();

  const steps = [
    {
      number: "01",
      title: "Upload Documents",
      icon: "bi bi-cloud-arrow-up-fill",
      actionUrl: "https://script.google.com/macros/s/AKfycbzNYtLFBP22Yv_779y61_LmvqE6znjnay1TWu0pV2iZYFRwjHWKEbz0V7Mq8hBrYyr38Q/exec",
    },
    {
      number: "02",
      title: "Coming Soon",
      icon: "bi bi-chat-dots-fill",
    },
    {
      number: "03",
      title: "Coming Soon",
      icon: "bi bi-people-fill",
    },
  ];

  const handleStepClick = (step) => {
    if (step.comingSoon) return;
    
    if (step.actionUrl) {
      // Open external Apps Script upload page in new tab
      window.open(step.actionUrl, "_blank", "noopener,noreferrer");
    } else {
      // Future internal navigation (if needed)
      alert("Feature coming soon!");
    }
  };

  return (
    <Layout
      breadcrumbs={[
        { name: "Dashboard", path: "/channel-partner" },
        { name: "New Project Development FMS", path: "/new-project-development" },
      ]}
    >
      <div className="process-page">
        <h1 className="process-title">
          <i className="bi bi-building-fill me-3"></i>
          New Project Development FMS
        </h1>

        <div className="timeline-container">
          <div className="timeline">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`timeline-item hover-card ${step.comingSoon ? "disabled" : "clickable"}`}
                onClick={() => handleStepClick(step)}
                role="button"
                tabIndex={step.comingSoon ? -1 : 0}
                onKeyDown={(e) => {
                  if (!step.comingSoon && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    handleStepClick(step);
                  }
                }}
              >
                {/* Number Circle */}
                <div className="timeline-marker">
                  <div className="marker-circle">
                    <span className="step-number">{step.number}</span>
                  </div>
                </div>

                {/* Content Card */}
                <div className="timeline-content">
                  <div className="content-inner">
                    <i className={`${step.icon} step-icon`}></i>
                    <div className="step-text">
                      <h3 className="step-title">
                        {step.title}
                        {step.actionUrl && !step.comingSoon && (
                          <small className="text-muted ms-2 fs-6">
                            <i className="bi bi-box-arrow-up-right me-1"></i>
                            opens in new tab
                          </small>
                        )}
                      </h3>
                      {step.description && (
                        <p className="step-description">{step.description}</p>
                      )}
                      {step.comingSoon && (
                        <span className="badge bg-secondary ms-2">Coming Soon</span>
                      )}
                    </div>
                    <i className="bi bi-arrow-right arrow-icon"></i>
                  </div>
                </div>

                {/* Connecting Line */}
                {index < steps.length - 1 && <div className="timeline-line"></div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default NewProjectProcess;