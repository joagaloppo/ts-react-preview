import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import Layout from '../../components/Layout';
import Spinner from '../../components/Spinner';
import Box from '../../components/Box';

const VerifyEmailRedirect: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token');
    const verify = async () => {
      if (token) {
        try {
          await authService.verifyEmail(token);
        } catch (err) {
          console.log(err);
        } finally {
          navigate('/');
        }
      }
    };
    verify();
  }, []);

  return (
    <Layout>
      <Box>
        <Spinner theme="dark" className="my-24" />
      </Box>
    </Layout>
  );
};

export default VerifyEmailRedirect;
