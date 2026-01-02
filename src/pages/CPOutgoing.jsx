import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";  
import "../assets/styles/CPOutgoing.css";

function CPOutgoing() {
  const navigate = useNavigate();

  return (
    <Layout
      breadcrumbs={[
        { name: "Channel Partner", path: "/channel-partner" },
        { name: "CP Outgoing FMS", path: "/channel-partner/cp-outgoing" }
      ]}
    >
      <div className="page-container">
        <h1 className="page-title">
          <i className="bi bi-arrow-up-right-circle me-3"></i>
          CP Outgoing FMS
        </h1>

        <div className="card-grid">
          {/* Active Card: Process */}
          <div
            className="card clickable hover-card"
            onClick={() => navigate("/channel-partner/cp-outgoing/process")}
          >
            <div className="card-icon">
              <i className="bi bi-diagram-3-fill"></i>
            </div>
            <h3>Process</h3>
            <span className="card-arrow">
              <i className="bi bi-arrow-right arrow-icon"></i>
            </span>
          </div>

          {/* Disabled Cards */}
          <div className="card disabled">
            <div className="card-icon muted">
              <i className="bi bi-clock-history"></i>
            </div>
            <h3>Updating Soon</h3>
          </div>

          <div className="card disabled">
            <div className="card-icon muted">
              <i className="bi bi-clock-history"></i>
            </div>
            <h3>Updating Soon</h3>
          </div>

          <div className="card disabled">
            <div className="card-icon muted">
              <i className="bi bi-clock-history"></i>
            </div>
            <h3>Updating Soon</h3>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CPOutgoing;