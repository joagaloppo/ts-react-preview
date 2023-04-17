import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({ baseURL: import.meta.env.VITE_API_URL })

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get('refreshToken');
        if (!refreshToken) throw new Error('Refresh token not found');

        const response = await axios.post('http://localhost:3000/auth/refresh-tokens', { refreshToken });
        const accessToken = response.data.access.token;
        const newRefreshToken = response.data.refresh.token;

        Cookies.set('accessToken', accessToken);
        Cookies.set('refreshToken', newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');        
        window.location.href = '/login';
        return Promise.reject(err);
      }

    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
