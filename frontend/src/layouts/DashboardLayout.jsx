import { Outlet } from "react-router-dom";

import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";

function DashboardLayout() {
  return (
    <>
      <Header />

      <div
        style={{
          display: "flex",
          minHeight: "calc(100vh - 130px)",
        }}
      >
        <Sidebar />

        <main
          style={{
            flex: 1,
            padding: "24px",
          }}
        >
          <Outlet />
        </main>
      </div>

      <Footer />
    </>
  );
}

export default DashboardLayout;