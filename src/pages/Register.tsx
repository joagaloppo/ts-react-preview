import Cookies from 'js-cookie';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import Box from '../components/Box';
import Button from '../components/Button';
import Input from '../components/Input';
import Alert from '../components/Alert';
import { signup } from '../services/authService';

interface FormData {
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
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

  const handleRegister = async (data: FormData) => {
    try {
      setCredentials({ loading: true, disabled: true });
      setGoogle({ loading: false, disabled: true });
      const responseData = await signup(data.name, data.email, data.password);
      Cookies.set('access_token', responseData.tokens.access.token, { expires: 1 / 48 });
      Cookies.set('refresh_token', responseData.tokens.refresh.token, { expires: 30 });
      window.location.href = '/';
    } catch (err: any) {
      setCredentials({ loading: false, disabled: false });
      setGoogle({ loading: false, disabled: false });
      setError(err.response.data.message);
    }
  };

  const nameValidation = {
    required: 'Name is required',
    minLength: {
      value: 2,
      message: 'Name must have at least 2 characters',
    },
    maxLength: {
      value: 128,
      message: 'Name must have at most 128 characters',
    },
    onChange: () => error && setError(''),
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
          <h1 className="text-2xl font-bold text-gray-700">Register</h1>
          <p className="text-base font-normal text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleRegister)}>
          {error && (
            <Alert size="lg" color="danger">
              {error}
            </Alert>
          )}
          <div className="flex flex-col gap-4">
            <Input
              padding="lg"
              placeholder="Your name"
              {...register('name', nameValidation)}
              name="name"
              type="text"
              error={errors.name?.message}
            />
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
          </div>
          <div className="flex flex-col gap-4">
            <Button
              loading={credentials.loading}
              disabled={credentials.disabled}
              variant="filled"
              size="lg"
              type="submit"
            >
              Sign Up
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

export default Register;
