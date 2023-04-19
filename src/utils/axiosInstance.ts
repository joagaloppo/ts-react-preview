import axios from 'axios';
import Cookies from 'js-cookie';

const normalInstance = axios.create({ baseURL: import.meta.env.VITE_SERVER_URL });
const bearerInstance = axios.create({ baseURL: import.meta.env.VITE_SERVER_URL });

bearerInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('access_token');
    if (accessToken) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

bearerInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // eslint-disable-next-line no-underscore-dangle
    if (error.response.status === 401 && !originalRequest._retry) {
      // eslint-disable-next-line no-underscore-dangle
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get('refresh_token');
        if (!refreshToken) throw new Error('Refresh token not found');

        const response = await axios.post('http://localhost:3000/auth/refresh-tokens', { refreshToken });
        const accessToken = response.data.access.token;
        const newRefreshToken = response.data.refresh.token;

        Cookies.set('access_token', accessToken, { expires: 1 / 48 });
        Cookies.set('refresh_token', newRefreshToken, { expires: 30 });

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return bearerInstance(originalRequest);
      } catch (err) {
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        window.location.href = '/login';
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export { normalInstance, bearerInstance };
