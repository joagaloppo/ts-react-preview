import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const GoogleRedirect: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const access = searchParams.get('access');
    const refresh = searchParams.get('refresh');

    if (access && refresh) {
      Cookies.set('access_token', access, { expires: 1 / 48 });
      Cookies.set('refresh_token', refresh, { expires: 30 });
    }
    navigate('/');
  }, []);

  return null;
};

export default GoogleRedirect;
