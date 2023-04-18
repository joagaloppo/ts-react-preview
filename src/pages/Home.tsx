import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import moment from 'moment';
import axiosInstance from '../utils/axiosInstance';
import Box from '../components/Box';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { logout } from '../services/authService';
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
  const [user, setUser] = useState<User | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [verifyEmailLoading, setVerifyEmailLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axiosInstance
      .get('http://localhost:3000/auth/secret')
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleLogout = async () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');

    const refreshToken = Cookies.get('refresh_token');
    if (!refreshToken) window.location.href = '/login';

    setDisabled(true);
    setLogoutLoading(true);

    await logout(refreshToken as string);
    window.location.href = '/login';
  };

  const handleVerifyEmail = async () => {
    setDisabled(true);
    setVerifyEmailLoading(true);

    try {
      await axiosInstance.post('http://localhost:3000/auth/send-verification-email');
      setDisabled(false);
      setVerifyEmailLoading(false);
      setSuccess(true);
    } catch (err: any) {
      setDisabled(false);
      setVerifyEmailLoading(false);
      setError(err.response.data.message);
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
          {user && (
            <div className="font-mono text-base font-normal text-gray-600">
              <p>ID: {user.id}</p>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Google: {user.googleId ? user.googleId : 'not a google user'}</p>
              <p>Email Verified: {user.emailVerified.toString()}</p>
              <p>Created At: {moment(user.createdAt).format('DD/MM/YYYY')}</p>
            </div>
          )}
          <div className="flex flex-col gap-4">
            {user && !user.emailVerified && (
              <div className="flex flex-col gap-4">
                {error && (
                  <Alert size="lg" color="danger">
                    {error}
                  </Alert>
                )}
                {success && (
                  <Alert size="lg" color="success">
                    Verification email sent
                  </Alert>
                )}
                <Button
                  disabled={disabled}
                  loading={verifyEmailLoading}
                  variant="filled"
                  size="lg"
                  onClick={handleVerifyEmail}
                >
                  Verify Email
                </Button>
              </div>
            )}
            <Button disabled={disabled} loading={logoutLoading} size="lg" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </Box>
    </Layout>
  );
};

export default Home;
