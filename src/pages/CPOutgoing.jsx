// src/pages/CPOutgoing.jsx
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import "../assets/styles/Process.css";

function CPOutgoing() {
  const navigate = useNavigate();

  const steps = [
    {
      number: "01",
      title: "Call to Broker",
      icon: "bi bi-telephone-inbound-fill", // filled version looks better in most UIs
      path: "/process/call-to-broker",
    },
    {
      number: "02",
      title: "Follow-up",
      icon: "bi bi-chat-dots-fill",
      path: "/process/followup",
    },
    {
      number: "03",
      title: "Meetings & Closure",
      icon: "bi bi-people-fill",
      path: "/process/meetings",
    },
  ];

  return (
    <Layout
      breadcrumbs={[
        { name: "Channel Partner", path: "/channel-partner" },
        { name: "CP Outgoing FMS", path: "/channel-partner/cp-outgoing" },
      ]}
    >
      <div className="process-page">
        <h1 className="process-title">
          <i className="bi bi-arrow-up-right-circle-fill me-3"></i>
          CP Outgoing FMS
        </h1>

        <div className="timeline-container">
          <div className="timeline">
            {steps.map((step, index) => (
              <div
                key={index}
                className="timeline-item hover-card clickable"
                onClick={() => navigate(step.path)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    navigate(step.path);
                  }
                }}
              >
                {/* Step Number Circle */}
                <div className="timeline-marker">
                  <div className="marker-circle">
                    <span className="step-number">{step.number}</span>
                  </div>
                </div>

                {/* Step Content */}
                <div className="timeline-content">
                  <div className="content-inner">
                    <i className={`${step.icon} step-icon`}></i>
                    <h3 className="step-title">{step.title}</h3>
                    <i className="bi bi-arrow-right arrow-icon"></i>
                  </div>
                </div>

                {/* Connecting line between steps */}
                {index < steps.length - 1 && (
                  <div className="timeline-line"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CPOutgoing;
