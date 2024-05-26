import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import DashboardPage from "./pages/DashboardPage/DashboardPage.jsx";
import VerifyEmailPage from "./pages/VerifyEmailPage/VerifyEmailPage.jsx";
import { useState } from "react";
import UserRefresh from "./components/UserRefresh/UserRefresh.jsx";

function App() {
  const [token, setToken] = useState(); // aktuell verwendete accessToken
  const [user, setUser] = useState();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage setToken={setToken} setUser={setUser} />} />
          <Route path="/dashboard" element={<DashboardPage token={token} user={user} />} />
          <Route path="/verifyEmail" element={<VerifyEmailPage token={token} user={user} />} />
        </Routes>
        <UserRefresh user={user} token={token} setUser={setUser} setToken={setToken} />
      </BrowserRouter>
    </>
  );
}

export default App;
