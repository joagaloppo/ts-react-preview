import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import Layout from '../components/Layout';
import Box from '../components/Box';
import Button from '../components/Button';
import Input from '../components/Input';
import Alert from '../components/Alert';

interface FormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleForgotPassword = async (data: FormData) => {
    try {
      setSuccess(false);
      setLoading(true);
      await authService.forgotPassword(data.email);
      setLoading(false);
      setSuccess(true);
    } catch (err: any) {
      setLoading(false);
      setError(err.response?.data?.message || "Couldn't send email");
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

  return (
    <Layout>
      <Box>
        <div className="mb-4 space-y-2">
          <div className="flex flex-row items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-700">Forgot Password</h1>
          </div>
          <p className="text-base font-normal text-gray-500">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleForgotPassword)}>
          {error && (
            <Alert size="lg" color="danger">
              {error}
            </Alert>
          )}
          {success && (
            <Alert size="lg" color="success">
              Email sent successfully
            </Alert>
          )}
          <div className="flex flex-col gap-4">
            <Input
              padding="lg"
              placeholder="Your email"
              {...register('email', emailValidation)}
              name="email"
              disabled={loading}
              error={errors.email?.message}
              type="email"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Button loading={loading} variant="filled" size="lg" type="submit">
              Send Email
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/login')}>
              Cancel
            </Button>
          </div>
        </form>
      </Box>
    </Layout>
  );
};

export default ForgotPassword;
