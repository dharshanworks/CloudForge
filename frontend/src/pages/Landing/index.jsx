import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routeConstants";
function Landing() {
  const navigate = useNavigate();
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "40px",
      }}
    >
      <h1 style={{ fontSize: "56px" }}>
        🚀 CloudForge
      </h1>

      <p
        style={{
          fontSize: "24px",
          marginTop: "20px",
        }}
      >
        Cloud Native Internal Developer Platform
      </p>

      <p
        style={{
          marginTop: "20px",
          maxWidth: "700px",
          lineHeight: "1.7",
        }}
      >
        Build, Deploy, Monitor and Scale cloud-native
        applications using modern DevOps practices.
      </p>

      <div
        style={{
          marginTop: "40px",
          display: "flex",
          gap: "20px",
        }}
      >
        <button
          onClick={() => navigate(ROUTES.LOGIN)}
          style={{
            padding: "14px 28px",
            cursor: "pointer",
          }}
        >
          Get Started
        </button>

        <button
          onClick={() => navigate(ROUTES.DASHBOARD)}
          style={{
            padding: "14px 28px",
            cursor: "pointer",
          }}
        >
          Learn More
        </button>
      </div>
    </main>
  );
}

export default Landing;