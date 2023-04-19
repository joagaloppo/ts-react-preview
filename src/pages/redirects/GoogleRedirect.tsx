import React, { useEffect } from 'react';
import Cookies from 'js-cookie';

const GoogleRedirect: React.FC = () => {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const access = searchParams.get('access');
    const refresh = searchParams.get('refresh');

    if (access && refresh) {
      Cookies.set('access_token', access, { expires: 1 / 48 });
      Cookies.set('refresh_token', refresh, { expires: 30 });
      window.location.href = '/';
    }
  }, []);

  return null;
};

export default GoogleRedirect;