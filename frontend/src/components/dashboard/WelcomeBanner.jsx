function WelcomeBanner() {
  return (
    <section
      style={{
        backgroundColor: "#ffffff",
        padding: "30px",
        borderRadius: "10px",
        marginBottom: "24px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
      }}
    >
      <h1
        style={{
          fontSize: "32px",
          marginBottom: "10px",
        }}
      >
        👋 Welcome Back
      </h1>

      <h2
        style={{
          color: "#2563eb",
          marginBottom: "15px",
        }}
      >
        CloudForge
      </h2>

      <p
        style={{
          color: "#555",
          lineHeight: "1.6",
        }}
      >
        Cloud Native Internal Developer Platform for building,
        deploying, monitoring and managing cloud-native
        applications.
      </p>
    </section>
  );
}

export default WelcomeBanner;