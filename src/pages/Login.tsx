import Cookies from 'js-cookie';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import Box from '../components/Box';
import Button from '../components/Button';
import Input from '../components/Input';
import Alert from '../components/Alert';
import { login } from '../services/authService';

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [error, setError] = useState('');

  const [credentials, setCredentials] = useState({
    loading: false,
    disabled: false,
  });

  const [google, setGoogle] = useState({
    loading: false,
    disabled: false,
  });

  const handleGoogleAuth = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setGoogle({ loading: true, disabled: true });
    setCredentials({ loading: false, disabled: true });
    window.location.href = import.meta.env.VITE_GOOGLE_URL;
  };

  const handleLogin = async (data: FormData) => {
    try {
      setCredentials({ loading: true, disabled: true });
      setGoogle({ loading: false, disabled: true });
      const res = await login(data.email, data.password);
      Cookies.set('access_token', res.tokens.access.token, { expires: 1 / 48 });
      Cookies.set('refresh_token', res.tokens.refresh.token, { expires: 30 });
      window.location.href = '/';
    } catch (err: any) {
      setCredentials({ loading: false, disabled: false });
      setGoogle({ loading: false, disabled: false });
      setError(err.response.data.message);
    }
  };

  const emailValidation = {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address',
    },
    maxLength: {
      value: 128,
      message: 'Email must have at most 128 characters',
    },
    onChange: () => error && setError(''),
  };

  const passwordValidation = {
    required: 'Password is required',
    minLength: {
      value: 6,
      message: 'Password must have at least 6 characters',
    },
    maxLength: {
      value: 128,
      message: 'Password must have at most 128 characters',
    },
    onChange: () => error && setError(''),
  };

  return (
    <Layout>
      <Box>
        <div className="mb-4 space-y-2">
          <h1 className="text-2xl font-bold text-gray-700">Login</h1>
          <p className="text-base font-normal text-gray-500">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-500">
              Register
            </Link>
          </p>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleLogin)}>
          {error && (
            <Alert size="lg" color="danger">
              {error}
            </Alert>
          )}
          <div className="flex flex-col gap-4">
            <Input
              padding="lg"
              placeholder="Your email"
              {...register('email', emailValidation)}
              name="email"
              error={errors.email?.message}
            />

            <Input
              padding="lg"
              placeholder="Your password"
              {...register('password', passwordValidation)}
              name="password"
              type="password"
              error={errors.password?.message}
            />
            <Link to="/forgot-password" className="w-fit text-sm font-normal text-blue-500">
              Forgot password?
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <Button
              loading={credentials.loading}
              disabled={credentials.disabled}
              variant="filled"
              size="lg"
              type="submit"
            >
              Sign In
            </Button>
            <Button
              loading={google.loading}
              disabled={google.disabled}
              variant="outline"
              size="lg"
              onClick={(e) => handleGoogleAuth(e)}
            >
              Continue with Google
            </Button>
          </div>
        </form>
      </Box>
    </Layout>
  );
};

export default Login;
