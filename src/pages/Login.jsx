import { useState } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import "../assets/styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      localStorage.setItem("user", JSON.stringify(res.user));
      navigate("/Dashboard");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center">
      <div className="container-fluid">
        <div className="row g-0 min-vh-100">
          {/* Left Side - Login Form (40%) */}
          <div className="col-lg-5 col-xl-4 d-flex align-items-center justify-content-center bg-white">
            <div className="w-100 px-4 px-md-5 py-5" style={{ maxWidth: "420px" }}>
              <div className="text-center mb-5">
                <i className="bi bi-graph-up-arrow text-primary fs-1 mb-3"></i>
                <h3 className="fw-bold">Welcome Back</h3>
                <p className="text-muted">Sign in to access your Sales Leads CRM</p>
              </div>

              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label fw-medium">
                    Email Address
                  </label>
                  <div className="input-group input-group-lg">
                    <span className="input-group-text bg-light">
                      <i className="bi bi-envelope text-primary"></i>
                    </span>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      placeholder="admin@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoFocus
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label fw-medium">
                    Password
                  </label>
                  <div className="input-group input-group-lg">
                    <span className="input-group-text bg-light">
                      <i className="bi bi-lock text-primary"></i>
                    </span>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-100 d-flex align-items-center justify-content-center gap-2 py-3 fw-semibold rounded-3"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" />
                      Logging in...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-box-arrow-in-right"></i>
                      Sign In
                    </>
                  )}
                </Button>
              </form>

              <div className="text-center mt-4 text-muted small">
                Use your registered credentials
              </div>
            </div>
          </div>

          {/* Right Side - Branded Panel (60%) - Now Clearly Visible */}
          <div className="col-lg-7 col-xl-8 d-none d-lg-flex align-items-center justify-content-center bg-primary-gradient text-white position-relative overflow-hidden">
            {/* Subtle wave shape overlay */}
            <div className="position-absolute start-0 top-0 bottom-0 w-100 bg-wave"></div>

            <div className="text-center px-5 z-10">
              <i className="bi bi-bar-chart-line-fill display-1 mb-4 opacity-75"></i>
              <h1 className="display-4 fw-bold mb-4">VRN INC.</h1>
              <p className="lead fs-3 mb-5 opacity-90">
                Empower your sales team with intelligent lead tracking and seamless channel partner management.
              </p>
              <div className="mx-auto" style={{ maxWidth: "600px" }}>
                <p className="fs-5 mb-3 opacity-80">Key Features</p>
                <ul className="list-unstyled fs-5 text-start d-inline-block">
                  <li className="mb-3"><i className="bi bi-check2-circle me-3"></i>Multi-stage follow-up workflow</li>
                  <li className="mb-3"><i className="bi bi-check2-circle me-3"></i>Real-time channel partner tracking</li>
                  <li className="mb-3"><i className="bi bi-check2-circle me-3"></i>Automated status updates</li>
                  <li className="mb-3"><i className="bi bi-check2-circle me-3"></i>Comprehensive reporting dashboard</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;