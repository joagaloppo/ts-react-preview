import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { bearerInstance } from '../utils/axiosInstance';
import Box from '../components/Box';
import Layout from '../components/Layout';
import Button from '../components/Button';
import authService from '../services/authService';
import Alert from '../components/Alert';

interface User {
  createdAt: string;
  email: string;
  emailVerified: boolean;
  googleId: string;
  id: string;
  name: string;
  password: string;
  updatedAt: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [verifyEmailLoading, setVerifyEmailLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const getSecret = async () => {
      try {
        const response = await bearerInstance.get(`${import.meta.env.VITE_API_URL}/auth/secret`);
        setUser(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getSecret();
  }, []);

  const handleLogout = async () => {
    const refreshToken = Cookies.get('refresh_token');
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    if (!refreshToken) navigate('/login');
    setDisabled(true);
    setLogoutLoading(true);
    await authService.logout(refreshToken as string);
    navigate('/login');
  };

  const handleVerifyEmail = async () => {
    setSuccess(false);
    setError('');
    setDisabled(true);
    setVerifyEmailLoading(true);
    try {
      await bearerInstance.post(`${import.meta.env.VITE_API_URL}/auth/send-verification-email`);
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Couldn't send verification email");
    } finally {
      setDisabled(false);
      setVerifyEmailLoading(false);
    }
  };

  return (
    <Layout>
      <Box>
        <div className="flex flex-col gap-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-gray-800">Home</h1>
            <p className="text-base font-normal text-gray-600">Welcome to your home page.</p>
          </div>
          <div className="font-mono text-base font-normal text-gray-600">
            {user ? (
              <>
                <p>ID: {user.id}</p>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Google: {user.googleId ? user.googleId : 'not a google user'}</p>
                <p>Created At: {moment(user.createdAt).format('DD/MM/YY - HH:mm')}</p>
              </>
            ) : (
              <p>Loading data...</p>
            )}
          </div>
          <Button disabled={disabled} loading={logoutLoading} size="lg" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Box>
    </Layout>
  );
};

export default Home;
