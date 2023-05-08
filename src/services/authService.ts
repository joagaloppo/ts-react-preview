import { bearerInstance, normalInstance } from '../utils/axiosInstance';

const login = async (email: string, password: string) => {
  const res = await normalInstance.post('/auth/login', { email, password });
  return res.data;
};

const google = async (token: string) => {
  const res = await normalInstance.post('/auth/google', { token });
  return res.data;
};

const register = async (name: string, email: string) => {
  const res = await normalInstance.post('/auth/register', { name, email });
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

const setPassword = async (token: string, password: string) => {
  const res = await normalInstance.post(`/auth/set-password`, { token, password });
  return res.data;
};

const deleteAccount = async () => {
  const res = await bearerInstance.delete('/user/me');
  return res.data;
};

const authService = {
  login,
  google,
  register,
  logout,
  verifyEmail,
  forgotPassword,
  setPassword,
  deleteAccount,
};

export default authService;
