import { NavLink } from "react-router-dom";
import ROUTES from "../../routes/routeConstants";

function Sidebar() {
  const linkStyle = {
    display: "block",
    padding: "12px",
    marginBottom: "10px",
    textDecoration: "none",
    color: "white",
    borderRadius: "6px",
  };

  return (
    <aside
      style={{
        width: "250px",
        backgroundColor: "#1e293b",
        color: "white",
        padding: "20px",
        minHeight: "calc(100vh - 130px)",
      }}
    >
      <h2>CloudForge</h2>

      <nav>
        <NavLink
          to={ROUTES.DASHBOARD}
          style={({ isActive }) => ({
            ...linkStyle,
            backgroundColor: isActive ? "#2563eb" : "transparent",
          })}
        >
          📊 Dashboard
        </NavLink>

        <NavLink
          to={ROUTES.PROJECTS}
          style={({ isActive }) => ({
            ...linkStyle,
            backgroundColor: isActive ? "#2563eb" : "transparent",
          })}
        >
          📁 Projects
        </NavLink>

        <NavLink
          to={ROUTES.APPLICATIONS}
          style={({ isActive }) => ({
            ...linkStyle,
            backgroundColor: isActive ? "#2563eb" : "transparent",
          })}
        >
          🚀 Applications
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;