import React, { useEffect } from 'react';
import Cookies from 'js-cookie';

const GoogleRedirect: React.FC = () => {

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const access = searchParams.get('access');
    const refresh = searchParams.get('refresh');

    if (access && refresh) {
      Cookies.set('accessToken', access);
      Cookies.set('refreshToken', refresh);
      window.location.href = '/';
    }
  }, []);

  return null;
};

export default GoogleRedirect;
