import React, { useEffect } from 'react';
import { verifyEmail } from '../../services/authService';

const VerifyEmailRedirect: React.FC = () => {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token');

    const verify = async () => {
      if (token) {
        try {
          await verifyEmail(token);
        } catch (err) {
          console.log(err);
        }
        window.location.href = '/';
      }
      window.location.href = '/';
    };

    verify();
  }, []);

  return null;
};

export default VerifyEmailRedirect;
