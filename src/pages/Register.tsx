import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';
import Layout from '../components/Layout';
import Box from '../components/Box';
import Button from '../components/Button';
import Input from '../components/Input';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleGoogleAuth = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.location.href = import.meta.env.VITE_GOOGLE_URL;
  };

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/register`, { name, email, password });
    const access = response.data.tokens.access.token;
    const refresh = response.data.tokens.refresh.token;

    if (access && refresh) {
      Cookies.set('access_token', access);
      Cookies.set('refresh_token', refresh);
      window.location.href = '/';
    }
  };

  return (
    <Layout>
      <Box>
        <div className="mb-4 space-y-2">
          <h1 className="text-2xl font-bold text-gray-700">Register</h1>
          <p className="text-base font-normal text-gray-500">
            Already have an account?{' '}
            <a href="/login" className="text-blue-500">
              Login
            </a>
          </p>
        </div>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <Input
              padding="lg"
              placeholder="Your name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
            />
            <Input
              padding="lg"
              placeholder="Your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
            />
            <Input
              padding="lg"
              placeholder="Your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Button variant="filled" size="lg" onClick={(e) => handleRegister(e)}>
              Sign Up
            </Button>
            <Button variant="outline" size="lg" onClick={(e) => handleGoogleAuth(e)}>
              Continue with Google
            </Button>
          </div>
        </form>
      </Box>
    </Layout>
  );
};

export default Register;
