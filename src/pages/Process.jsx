import { useNavigate } from "react-router-dom";
import Layout from "./Layout";  
import "./Process.css";

function Process() {
  const navigate = useNavigate();

  const steps = [
    { 
      number: "01", 
      title: "Call to Broker", 
      icon: "bi bi-telephone-inbound", 
      path: "/process/call-to-broker" 
    },
    { 
      number: "02", 
      title: "Followup", 
      icon: "bi bi-chat-dots", 
      path: "/process/followup" 
    },
    { 
      number: "03", 
      title: "Meetings", 
      icon: "bi bi-people-fill", 
      path: "/process/meetings" 
    },
  ];

  return (
    <Layout
      breadcrumbs={[
        { name: "Process Flow", path: "/process" }
      ]}
    >
      <div className="process-page">
        <h1 className="process-title">
          <i className="bi bi-diagram-3 me-3"></i>
          Process Flow
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
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && navigate(step.path)}
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
                    <h3 className="step-title">{step.title}</h3>
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

export default Process;