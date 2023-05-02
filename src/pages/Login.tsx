import Cookies from 'js-cookie';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useGoogleLogin } from '@react-oauth/google';
import Layout from '../components/Layout';
import Box from '../components/Box';
import Button from '../components/Button';
import Input from '../components/Input';
import Alert from '../components/Alert';
import authService from '../services/authService';

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogle = useGoogleLogin({
    onSuccess: async (google) => {
      setDisabled(true);
      setGoogleLoading(true);
      try {
        const res = await authService.google(google.access_token);
        Cookies.set('access_token', res.tokens.access.token, { expires: 1 / 48 });
        Cookies.set('refresh_token', res.tokens.refresh.token, { expires: 30 });
        navigate('/');
      } catch (err: any) {
        setError(err.response.data.message || 'Something went wrong');
      } finally {
        setDisabled(false);
        setGoogleLoading(false);
      }
    },
    onError: () => setError('Something went wrong'),
  });

  const handleLogin = async (data: FormData) => {
    setDisabled(true);
    setEmailLoading(true);
    try {
      const res = await authService.login(data.email, data.password);
      Cookies.set('access_token', res.tokens.access.token, { expires: 1 / 48 });
      Cookies.set('refresh_token', res.tokens.refresh.token, { expires: 30 });
      navigate('/');
    } catch (err: any) {
      setError(err.response.data.message || 'Something went wrong');
    } finally {
      setDisabled(false);
      setEmailLoading(false);
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
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
        <form className="mb-4 flex flex-col gap-4" onSubmit={handleSubmit(handleLogin)}>
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
              disabled={disabled}
            />

            <Input
              padding="lg"
              placeholder="Your password"
              {...register('password', passwordValidation)}
              name="password"
              type="password"
              error={errors.password?.message}
              disabled={disabled}
            />
            <Link to="/forgot-password" className="w-fit text-sm">
              Forgot password?
            </Link>
          </div>
          <Button loading={emailLoading} disabled={disabled} variant="filled" size="lg" type="submit">
            Sign In
          </Button>
        </form>
        <Button
          loading={googleLoading}
          disabled={disabled}
          variant="outline"
          size="lg"
          onClick={() => handleGoogle()}
          type="button"
        >
          Continue with Google
        </Button>
      </Box>
    </Layout>
  );
};

export default Login;
