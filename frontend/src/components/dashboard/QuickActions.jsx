function QuickActions() {
  const actions = [
    {
      id: 1,
      title: "➕ New Project",
    },
    {
      id: 2,
      title: "🚀 Deploy Application",
    },
    {
      id: 3,
      title: "📊 Monitoring",
    },
    {
      id: 4,
      title: "☸ Kubernetes",
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
            style={{
              padding: "30px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              cursor: "pointer",
              background: "white",
              fontSize: "18px",
              fontWeight: "bold",
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