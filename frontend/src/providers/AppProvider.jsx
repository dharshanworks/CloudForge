import { BrowserRouter } from "react-router-dom";
import AppRouter from "../routes/AppRouter";

function AppProvider() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default AppProvider;