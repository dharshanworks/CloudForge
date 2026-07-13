import { useNavigate } from "react-router-dom";

function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      id: 1,
      title: "➕ New Project",
      action: () => navigate("/projects/create"),
    },
    {
      id: 2,
      title: "🚀 Deploy Application",
      action: () => alert("Coming Soon 🚀"),
    },
    {
      id: 3,
      title: "📊 Monitoring",
      action: () => alert("Coming Soon 📊"),
    },
    {
      id: 4,
      title: "☸ Kubernetes",
      action: () => alert("Coming Soon ☸"),
    },
  ];

  return (
    <section
      style={{
        marginTop: "24px",
      }}
    >
      <h2>Quick Actions</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={action.action}
            style={{
              padding: "30px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              cursor: "pointer",
              background: "white",
              fontSize: "18px",
              fontWeight: "bold",
              transition: "0.2s",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#2563eb";
              e.target.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#ffffff";
              e.target.style.color = "#000000";
            }}
          >
            {action.title}
          </button>
        ))}
      </div>
    </section>
  );
}

export default QuickActions;