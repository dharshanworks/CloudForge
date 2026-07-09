import StatCard from "../ui/StatCard";

function StatsCards() {
  const stats = [
    {
      title: "Projects",
      value: 12,
      icon: "📁",
    },
    {
      title: "Deployments",
      value: 34,
      icon: "🚀",
    },
    {
      title: "Running Services",
      value: 18,
      icon: "⚙️",
    },
    {
      title: "Healthy Clusters",
      value: 4,
      icon: "☸️",
    },
  ];

  return (
    <section
      style={{
        marginTop: "30px",
      }}
    >
      <h2>Platform Overview</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>
    </section>
  );
}

export default StatsCards;