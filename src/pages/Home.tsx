import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import axiosInstance from '../utils/axiosInstance';
import Box from '../components/Box';
import Layout from '../components/Layout';
import Button from '../components/Button';

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

function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    axiosInstance
      .get('http://localhost:3000/auth/secret')
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleLogout = () => {
    axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/logout`, { refreshToken: Cookies.get('refresh_token') });
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    window.location.href = '/';
  };

  const handleVerifyEmail = () => axiosInstance.post(`${import.meta.env.VITE_SERVER_URL}/auth/send-verification-email`);

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
              <Button variant="filled" size="lg" onClick={handleVerifyEmail}>
                Verify Email
              </Button>
            )}
            <Button size="lg" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </Box>
    </Layout>
  );
}

export default Home;
