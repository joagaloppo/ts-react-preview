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
  name: string;
  email: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
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

  const handleRegister = async (data: FormData) => {
    setDisabled(true);
    setEmailLoading(true);
    setSuccess(false);
    setError('');
    try {
      await authService.register(data.name, data.email);
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setDisabled(false);
      setEmailLoading(false);
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

  return (
    <Layout>
      <Box>
        <div className="mb-4 space-y-2">
          <h1 className="text-2xl font-bold text-gray-700">Register</h1>
          <p className="text-base font-normal text-gray-500">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
        <form className="mb-4 flex flex-col gap-4" onSubmit={handleSubmit(handleRegister)}>
          {error && (
            <Alert size="lg" color="danger">
              {error}
            </Alert>
          )}
          {success && (
            <Alert size="lg" color="success">
              Check your email to set a password
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
              placeholder="Your name"
              {...register('name', nameValidation)}
              name="name"
              type="text"
              error={errors.name?.message}
              disabled={disabled}
            />
          </div>
          <div className="flex flex-col gap-4">
            <Button loading={emailLoading} disabled={disabled} variant="filled" size="lg" type="submit">
              Sign Up
            </Button>
          </div>
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

export default Register;
