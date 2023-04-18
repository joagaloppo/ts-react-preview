import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import GoogleRedirect from './pages/redirects/GoogleRedirect';
import VerifyEmailRedirect from './pages/redirects/VerifyEmailRedirect';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function AppRoutes() {
  const isAuth = !!Cookies.get('access_token');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/google" element={<GoogleRedirect />} />
        <Route path="/verify-email" element={<VerifyEmailRedirect />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/login" element={isAuth ? <Navigate to="/" replace={true} /> : <Login />} />
        <Route path="/register" element={isAuth ? <Navigate to="/" replace={true} /> : <Register />} />
        <Route path="/" element={isAuth ? <Home /> : <Navigate to="/login" replace={true} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
