import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import GoogleRedirect from "./pages/GoogleRedirect";
import VerifyEmailRedirect from "./pages/VerifyEmailRedirect";
import Cookies from "js-cookie";

function AppRoutes() {
  const isLoggedIn = !!Cookies.get('accessToken');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/google" element={<GoogleRedirect />} />
        <Route path="/verify-email" element={<VerifyEmailRedirect />} />
        
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" replace={true} /> : <Login /> } />
        <Route path="/register" element={isLoggedIn ? <Navigate to="/" replace={true} /> : <Register /> } />
        <Route path="/" element={isLoggedIn ? <Home/>: <Navigate to="/login" replace={true} /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
