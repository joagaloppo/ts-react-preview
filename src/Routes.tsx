import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from './components/Layout';
import Spinner from './components/Spinner';
import Box from './components/Box';

const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const SetPassword = lazy(() => import('./pages/SetPassword'));
const Home = lazy(() => import('./pages/Home'));
const VerifyEmailRedirect = lazy(() => import('./pages/redirects/VerifyEmailRedirect'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));

function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <Layout>
            <Box>
              <Spinner theme="dark" className="my-24" />
            </Box>
          </Layout>
        }
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/set-password" element={<SetPassword />} />
          <Route path="/verify-email" element={<VerifyEmailRedirect />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;
