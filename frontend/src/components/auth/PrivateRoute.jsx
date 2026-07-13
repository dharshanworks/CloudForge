import { Navigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  // Wait until authentication check finishes
  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        Loading...
      </div>
    );
  }

  // User not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // User authenticated
  return children;
}

export default PrivateRoute;