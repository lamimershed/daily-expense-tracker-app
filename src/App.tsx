import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import AppLayout from "@components/appLayout/AppLayout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashBoardPage from "./pages/DashBoardPage";
import { useUserStore } from "./store/useUserStore";
import { useEffect } from "react";
function App() {
  const navigate = useNavigate();
  const { user } = useUserStore();
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/" element={<DashBoardPage />} />
      </Route>
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
}

export default App;
