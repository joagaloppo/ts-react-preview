import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const useAuth = () => {
  const [isAuth, setIsAuth] = useState(!!Cookies.get('access_token'));

  useEffect(() => {
    setIsAuth(!!Cookies.get('access_token'));
  }, []);

  return isAuth;
};

export default useAuth;
