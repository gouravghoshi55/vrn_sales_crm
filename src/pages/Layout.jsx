// src/components/Layout.jsx
import { Link } from "react-router-dom";

function Layout({ children, breadcrumbs }) {
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  return (
    <div className="min-vh-100 d-flex flex-column">
      <header className="bg-primary text-white shadow-sm py-3">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <Link to="/" className="text-white text-decoration-none">
              <h1 className="h4 mb-0 d-flex align-items-center gap-3">
                <i className="bi bi-graph-up-arrow fs-3"></i>
                Sales Leads Dashboard
              </h1>
            </Link>

            {user && (
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-person-circle fs-4"></i>
                <span className="fw-medium">{user.email}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav aria-label="breadcrumb" className="bg-light py-2 border-bottom">
          <div className="container">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link to="/" className="text-decoration-none">
                  <i className="bi bi-house-door me-1"></i>Home
                </Link>
              </li>
              {breadcrumbs.map((crumb, index) => (
                <li
                  key={index}
                  className={`breadcrumb-item ${
                    index === breadcrumbs.length - 1 ? "active" : ""
                  }`}
                  aria-current={index === breadcrumbs.length - 1 ? "page" : undefined}
                >
                  {index === breadcrumbs.length - 1 ? (
                    crumb.name
                  ) : (
                    <Link to={crumb.path} className="text-decoration-none">
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </nav>
      )}

      <main className="flex-grow-1 bg-light">
        {children}
      </main>
    </div>
  );
}

export default Layout;