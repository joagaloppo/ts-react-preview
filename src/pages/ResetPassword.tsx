import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import Layout from '../components/Layout';
import Box from '../components/Box';
import Button from '../components/Button';
import Input from '../components/Input';
import Alert from '../components/Alert';

interface FormData {
  password: string;
  confirm_password: string;
}

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const handleForgotPassword = async (data: FormData) => {
    if (success) setSuccess(false);
    if (error) setError('');
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token');
    if (!token) {
      setError('Invalid token');
      return;
    }

    try {
      setLoading(true);
      await authService.resetPassword(token, data.password);
      setLoading(false);
      setSuccess(true);
    } catch (err: any) {
      setLoading(false);
      setError(err.response?.data?.message || "Couldn't reset password");
    }
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

  const confirmPasswordValidation = {
    required: 'Confirm password is required',
    validate: (val: string) => (watch('password') !== val ? 'Your passwords do no match' : true),
    onChange: () => error && setError(''),
  };

  return (
    <Layout>
      <Box>
        <div className="mb-4 space-y-2">
          <h1 className="text-2xl font-bold text-gray-700">Reset Password</h1>
          <p className="text-base font-normal text-gray-500">Enter your new password and we'll reset it for you.</p>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleForgotPassword)}>
          {error && (
            <Alert size="lg" color="danger">
              {error}
            </Alert>
          )}
          {success && (
            <Alert size="lg" color="success">
              Your password has been reset successfully.
            </Alert>
          )}
          <div className="flex flex-col gap-4">
            <Input
              padding="lg"
              placeholder="Your new password"
              {...register('password', passwordValidation)}
              name="password"
              type="password"
              error={errors.password?.message}
            />
            <Input
              padding="lg"
              {...register('confirm_password', confirmPasswordValidation)}
              name="confirm_password"
              type="password"
              error={errors.confirm_password?.message}
              placeholder="Repeat new password"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Button loading={loading} variant="filled" size="lg" type="submit">
              Reset Password
            </Button>
            <Button variant="outline" size="lg" type="button" onClick={() => navigate('/login')}>
              Back
            </Button>
          </div>
        </form>
      </Box>
    </Layout>
  );
};

export default ResetPassword;
