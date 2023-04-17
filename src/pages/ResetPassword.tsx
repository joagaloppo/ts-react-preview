import axios from 'axios';
import { useState } from 'react';
import Layout from '../components/Layout';
import Box from '../components/Box';
import Button from '../components/Button';
import Input from '../components/Input';

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleForgotPassword = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token');

    if (password === confirmPassword) {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/reset-password?token=${token}`, { password });
      window.location.href = '/login';
    }
  };

  return (
    <Layout>
      <Box>
        <div className="mb-4 space-y-2">
          <h1 className="text-2xl font-bold text-gray-700">Reset Password</h1>
          <p className="text-base font-normal text-gray-500">Enter your new password and we'll reset it for you.</p>
        </div>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <Input
              padding="lg"
              placeholder="Your new password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
            />
            <Input
              padding="lg"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              placeholder="Repeat new password"
              type="password"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Button variant="filled" size="lg" onClick={(e) => handleForgotPassword(e)}>
              Reset Password
            </Button>
          </div>
        </form>
      </Box>
    </Layout>
  );
};

export default ResetPassword;
