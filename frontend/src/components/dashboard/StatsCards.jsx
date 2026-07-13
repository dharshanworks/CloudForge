import StatCard from "../ui/StatCard";
import { useProjects } from "../../hooks/useProjects";

function StatsCards() {
  const {
    projects = [],
    loading,
    error,
  } = useProjects();

  const stats = [
    {
      title: "Projects",
      value: loading ? "..." : projects?.length ?? 0,
      icon: "📁",
    },
    {
      title: "Deployments",
      value: "Coming Soon",
      icon: "🚀",
    },
    {
      title: "Running Services",
      value: "Coming Soon",
      icon: "⚙️",
    },
    {
      title: "Healthy Clusters",
      value: "Coming Soon",
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

      {error && (
        <div
          style={{
            backgroundColor: "#fee2e2",
            color: "#b91c1c",
            padding: "12px",
            borderRadius: "6px",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          {error}
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
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