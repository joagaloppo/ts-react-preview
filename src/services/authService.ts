import axios from 'axios';

const inst = axios.create({ baseURL: import.meta.env.VITE_SERVER_URL });

export const login = async (email: string, password: string) => {
  const res = await inst.post('/auth/login', { email, password });
  return res.data;
};

export const signup = async (name: string, email: string, password: string) => {
  const res = await inst.post('/auth/register', { name, email, password });
  return res.data;
};

export const logout = async (refreshToken: string) => {
  const res = await inst.post('/auth/logout', { refreshToken });
  return res.data;
};

export const verifyEmail = async (token: string) => {
  const res = await inst.post(`/auth/verify-email?token=${token}`);
  return res.data;
};

export const forgotPassword = async (email: string) => {
  const res = await inst.post('/auth/forgot-password', { email });
  return res.data;
};

export const resetPassword = async (token: string, password: string) => {
  const res = await inst.post(`/auth/reset-password?token=${token}`, { password });
  return res.data;
};
