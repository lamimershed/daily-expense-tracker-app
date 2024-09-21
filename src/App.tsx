import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "@components/appLayout/AppLayout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashBoardPage from "./pages/DashBoardPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route element={<Navigate to="/login" replace={true} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/" element={<DashBoardPage />} />
      </Route>
    </Routes>
  );
}

export default App;
