function StatCard({ title, value, icon }) {
  return (
    <div
      style={{
        background: "white",
        padding: "24px",
        borderRadius: "10px",
        border: "1px solid #ddd",
      }}
    >
      <div
        style={{
          fontSize: "32px",
        }}
      >
        {icon}
      </div>

      <h3>{title}</h3>

      <h1>{value}</h1>
    </div>
  );
}

export default StatCard;