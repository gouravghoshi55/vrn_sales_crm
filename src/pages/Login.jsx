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

    try {
      const res = await login(email, password);

      if (res.success) {
        localStorage.setItem("user", JSON.stringify(res.user));
        navigate("/Dashboard");
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center position-relative">
      <div className="container-fluid">
        <div className="row g-0 min-vh-100">
          {/* Left Side - Login Form (40%) */}
          <div className="col-lg-5 col-xl-4 d-flex align-items-center justify-content-center bg-white">
            <div
              className="w-100 px-4 px-md-5 py-5"
              style={{ maxWidth: "420px" }}
            >
              <div className="text-center mb-5">
                <i className="bi bi-graph-up-arrow text-primary fs-1 mb-3"></i>
                <h3 className="fw-bold">Welcome Back</h3>
                <p className="text-muted">
                  Sign in to access your Sales Leads CRM
                </p>
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
                      disabled={loading}
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
                      disabled={loading}
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
                    <>Logging in...</>
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

          {/* Right Side - Branded Panel (60%) */}
          <div className="col-lg-7 col-xl-8 d-none d-lg-flex align-items-center justify-content-center bg-primary-gradient text-white position-relative overflow-hidden">
            <div className="position-absolute start-0 top-0 bottom-0 w-100 bg-wave"></div>

            <div className="text-center px-5 z-10">
              <i className="bi bi-bar-chart-line-fill display-1 mb-4 opacity-75"></i>
              <h1 className="display-4 fw-bold mb-4">VRN INC.</h1>
              <p className="lead fs-3 mb-5 opacity-90">
                Empower your sales team with intelligent lead tracking and
                seamless channel partner management.
              </p>
              <div className="mx-auto" style={{ maxWidth: "600px" }}>
                <p className="fs-5 mb-3 opacity-80">Key Features</p>
                <ul className="list-unstyled fs-5 text-start d-inline-block">
                  <li className="mb-3">
                    <i className="bi bi-check2-circle me-3"></i>Multi-stage
                    follow-up workflow
                  </li>
                  <li className="mb-3">
                    <i className="bi bi-check2-circle me-3"></i>Real-time
                    channel partner tracking
                  </li>
                  <li className="mb-3">
                    <i className="bi bi-check2-circle me-3"></i>Automated status
                    updates
                  </li>
                  <li className="mb-3">
                    <i className="bi bi-check2-circle me-3"></i>Comprehensive
                    reporting dashboard
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-screen loading overlay */}
{loading && (
  <div
    className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
    style={{
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      zIndex: 2000,
      backdropFilter: "blur(4px)",
    }}
  >
    <style>{`
      /* 4-ball rolling animation */
      .custom-loader {
        height: 40px;
        aspect-ratio: 2.5;
        --_g: no-repeat radial-gradient(farthest-side, #fff 90%, transparent);
        background: var(--_g), var(--_g), var(--_g), var(--_g);
        background-size: 20% 50%;
        animation: l43 1s infinite linear;
        filter: drop-shadow(0 0 10px rgba(255,255,255,0.3));
      }

      @keyframes l43 {
        0% { 
          background-position: calc(0*100%/3) 50%, calc(1*100%/3) 50%, calc(2*100%/3) 50%, calc(3*100%/3) 50%;
        }
        16.67% { 
          background-position: calc(0*100%/3) 0, calc(1*100%/3) 50%, calc(2*100%/3) 50%, calc(3*100%/3) 50%;
        }
        33.33% { 
          background-position: calc(0*100%/3) 100%, calc(1*100%/3) 0, calc(2*100%/3) 50%, calc(3*100%/3) 50%;
        }
        50% { 
          background-position: calc(0*100%/3) 50%, calc(1*100%/3) 100%, calc(2*100%/3) 0, calc(3*100%/3) 50%;
        }
        66.67% { 
          background-position: calc(0*100%/3) 50%, calc(1*100%/3) 50%, calc(2*100%/3) 100%, calc(3*100%/3) 0;
        }
        83.33% { 
          background-position: calc(0*100%/3) 50%, calc(1*100%/3) 50%, calc(2*100%/3) 50%, calc(3*100%/3) 100%;
        }
        100% { 
          background-position: calc(0*100%/3) 50%, calc(1*100%/3) 50%, calc(2*100%/3) 50%, calc(3*100%/3) 50%;
        }
      }

      /* Overlay entrance animation */
      .loader-container {
        animation: fadeInScale 0.4s ease-out forwards;
        opacity: 0;
        transform: scale(0.8);
      }

      @keyframes fadeInScale {
        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      /* Text animations */
      .loading-title {
        animation: textGlow 2s ease-in-out infinite alternate;
        background: linear-gradient(45deg, #fff, #ccc);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      @keyframes textGlow {
        from { filter: drop-shadow(0 0 5px rgba(255,255,255,0.3)); }
        to { filter: drop-shadow(0 0 15px rgba(255,255,255,0.6)); }
      }

      .loading-subtitle {
        animation: pulseText 2s ease-in-out infinite;
      }

      @keyframes pulseText {
        0%, 100% { opacity: 0.7; }
        50% { opacity: 1; }
      }
    `}</style>

    <div className="text-center loader-container p-5">
      <div className="custom-loader mx-auto mb-4"></div>
      
      <h3 className="fw-bold loading-title mb-2 fs-2">
        Logging...
      </h3>
    </div>
  </div>
)}
    </div>
  );
}

export default Login;
