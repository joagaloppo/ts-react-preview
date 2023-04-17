import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import GoogleRedirect from "./pages/GoogleRedirect";
import VerifyEmailRedirect from "./pages/VerifyEmailRedirect";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function AppRoutes() {
  const isLoggedIn = !!Cookies.get('accessToken');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/google" element={<GoogleRedirect />} />
        <Route path="/verify-email" element={<VerifyEmailRedirect />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" replace={true} /> : <Login /> } />
        <Route path="/register" element={isLoggedIn ? <Navigate to="/" replace={true} /> : <Register /> } />
        <Route path="/" element={isLoggedIn ? <Home/>: <Navigate to="/login" replace={true} /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
