import { bearerInstance, normalInstance } from '../utils/axiosInstance';

const login = async (email: string, password: string) => {
  const res = await normalInstance.post('/auth/login', { email, password });
  return res.data;
};

const register = async (name: string, email: string, password: string) => {
  const res = await normalInstance.post('/auth/register', { name, email, password });
  return res.data;
};

const logout = async (refreshToken: string) => {
  const res = await normalInstance.post('/auth/logout', { refreshToken });
  return res.data;
};

const verifyEmail = async (token: string) => {
  const res = await bearerInstance.post(`/auth/verify-email?token=${token}`);
  return res.data;
};

const forgotPassword = async (email: string) => {
  const res = await normalInstance.post('/auth/forgot-password', { email });
  return res.data;
};

const resetPassword = async (token: string, password: string) => {
  const res = await normalInstance.post(`/auth/reset-password?token=${token}`, { password });
  return res.data;
};

const authService = {
  login,
  register,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
};

export default authService;
