import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import "../assets/styles/ChannelPartner.css";

function ChannelPartner() {
  const navigate = useNavigate();

  return (
    <Layout
      breadcrumbs={[{ name: "Channel Partner", path: "/channel-partner" }]}
    >
      <div className="page-container">
        <h1 className="page-title">
          <i className="bi bi-people me-3"></i>
          Channel Partner
        </h1>

        <div className="card-grid">
          {/* Active Card - CP Outgoing FMS */}
          <div
            className="card clickable hover-card"
            onClick={() => navigate("/channel-partner/cp-outgoing")}
          >
            <div className="card-icon">
              <i className="bi bi-arrow-up-right-circle-fill"></i>
            </div>
            <h3>CP Outgoing FMS</h3>
            <span className="card-arrow">
              <i className="bi bi-arrow-right arrow-icon"></i>
            </span>
          </div>

<div
  className="card clickable hover-card"
  onClick={() => navigate("/new-project-development")}
  title="New Project Development FMS Process"
>
  <div className="card-icon">
    <i className="bi bi-building-fill"></i>
  </div>
  <h3>NEW Project Development FMS</h3>
  <span className="card-arrow">
    <i className="bi bi-arrow-right arrow-icon"></i>
  </span>
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

export default ChannelPartner;
