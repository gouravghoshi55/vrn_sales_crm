import { Link } from "react-router-dom";
import Layout from "../components/Layout"; 
import "../assets/styles/Dashboard.css";

function Dashboard() {
  const userData = localStorage.getItem("user");

  if (!userData) {
    return (
      <Layout breadcrumbs={[]}>
        <div className="container mt-5">
          <div className="alert alert-warning text-center">
            <h4>No user found</h4>
            <p>Please log in to access the dashboard.</p>
          </div>
        </div>
      </Layout>
    );
  }

  const user = JSON.parse(userData);

  return (
    <Layout breadcrumbs={[]}>
      <div className="container my-5">
        {/* Welcome Card */}
        <div className="card shadow border-0 mb-5 overflow-hidden">
          <div className="card-header bg-primary text-white text-center py-5">
            <p className="mb-0 fs-5">
              You are logged in as <strong>{user.email}</strong>
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="row g-4">
          {/* Channel Partner - WITH HOVER */}
          <div className="col-lg-4 col-md-6">
            <Link to="/channel-partner" className="text-decoration-none">
              <div className="card h-100 border-0 shadow hover-card">
                <div className="card-body text-center py-5">
                  <i className="bi bi-people fs-1 text-primary mb-4"></i>
                  <h5 className="card-title mb-0 fw-bold">Channel Partner</h5>
                </div>
                <div className="card-footer bg-transparent border-0 text-muted text-center py-3">
                  <span className="d-inline-flex align-items-center gap-2">
                    View Details <i className="bi bi-arrow-right arrow-icon"></i>
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Coming Soon 1 */}
          <div className="col-lg-4 col-md-6">
            <div className="card h-100 border-0 shadow bg-light coming-soon-hover">
              <div className="card-body text-center py-5 text-muted">
                <i className="bi bi-clock-history fs-1 mb-4"></i>
                <h5 className="card-title mb-0">Coming Soon</h5>
                <p className="mt-3 small">This feature is under development</p>
              </div>
            </div>
          </div>

          {/* Coming Soon 2 */}
          <div className="col-lg-4 col-md-6">
            <div className="card h-100 border-0 shadow bg-light coming-soon-hover">
              <div className="card-body text-center py-5 text-muted">
                <i className="bi bi-clock-history fs-1 mb-4"></i>
                <h5 className="card-title mb-0">Coming Soon</h5>
                <p className="mt-3 small">This feature is under development</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;