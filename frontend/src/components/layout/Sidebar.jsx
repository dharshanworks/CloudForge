import { NavLink } from "react-router-dom";
import ROUTES from "../../routes/routeConstants";

function Sidebar() {
  const linkStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "14px 16px",
    marginBottom: "10px",
    textDecoration: "none",
    color: "#ffffff",
    borderRadius: "8px",
    fontWeight: "500",
    transition: "0.2s",
  };

  const activeStyle = {
    backgroundColor: "#2563eb",
  };

  return (
    <aside
      style={{
        width: "250px",
        backgroundColor: "#1e293b",
        color: "#ffffff",
        padding: "20px",
        minHeight: "calc(100vh - 130px)",
        boxSizing: "border-box",
      }}
    >
      {/* Logo */}

      <h2
        style={{
          marginTop: 0,
          marginBottom: "35px",
        }}
      >
        CloudForge
      </h2>

      {/* Navigation */}

      <nav>
        {/* Dashboard */}

        <NavLink
          to={ROUTES.DASHBOARD}
          style={({ isActive }) => ({
            ...linkStyle,
            ...(isActive
              ? activeStyle
              : {}),
          })}
        >
          📊 Dashboard
        </NavLink>

        {/* Projects */}

        <NavLink
          to={ROUTES.PROJECTS}
          style={({ isActive }) => ({
            ...linkStyle,
            ...(isActive
              ? activeStyle
              : {}),
          })}
        >
          📁 Projects
        </NavLink>

        {/* Divider */}

        <div
          style={{
            margin: "30px 0 15px",
            borderTop:
              "1px solid rgba(255,255,255,0.15)",
          }}
        />

        {/* Upcoming Modules */}

        <h4
          style={{
            color: "#94a3b8",
            marginBottom: "15px",
            fontSize: "14px",
          }}
        >
          Coming Soon
        </h4>

        <div style={comingSoonStyle}>
          🚀 Applications
        </div>

        <div style={comingSoonStyle}>
          🚀 Deployments
        </div>

        <div style={comingSoonStyle}>
          📦 Pipelines
        </div>

        <div style={comingSoonStyle}>
          ☸ Kubernetes
        </div>

        <div style={comingSoonStyle}>
          📈 Monitoring
        </div>

        <div style={comingSoonStyle}>
          📊 Logs
        </div>

        <div style={comingSoonStyle}>
          ⚙ Settings
        </div>
      </nav>
    </aside>
  );
}

const comingSoonStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "12px 16px",
  marginBottom: "8px",
  color: "#94a3b8",
  borderRadius: "8px",
  cursor: "not-allowed",
  opacity: 0.7,
};

export default Sidebar;