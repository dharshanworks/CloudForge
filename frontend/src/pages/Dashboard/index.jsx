import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import QuickActions from "../../components/dashboard/QuickActions";
import StatsCards from "../../components/dashboard/StatsCards";

function Dashboard() {
  return (
    <>
      <WelcomeBanner />

      <QuickActions />

      <StatsCards />
    </>
  );
}

export default Dashboard;