import { memo, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import Spinner from './Spinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
}

const variants = {
  filled: (loading: boolean, disabled: boolean) =>
    clsx(`bg-primary-500 text-white`, loading || disabled ? 'cursor-not-allowed' : `hover:bg-primary-600`),
  outline: (loading: boolean, disabled: boolean) =>
    clsx(
      `bg-white text-primary-500 border border-primary-500`,
      loading || disabled ? 'cursor-not-allowed' : `hover:border-primary-600 hover:text-primary-600 hover:bg-primary/10`
    ),
};

const sizes = {
  xs: 'py-2 px-4',
  sm: 'py-2.5 px-4',
  md: 'py-3 px-6',
  lg: 'py-3.5 px-8',
  xl: 'py-4 px-10',
};

const transition = 'transition duration-300 ease-in-out';

const rest = 'rounded-sm text-base font-medium disabled:opacity-80';

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'outline',
  size = 'sm',
  loading = false,
  disabled = false,
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(variants[variant](loading, disabled), sizes[size], transition, rest, className)}
      disabled={loading || disabled}
      aria-disabled={loading || disabled}
      aria-busy={loading}
      {...props}
    >
      {loading ? <Spinner theme={variant === 'filled' ? 'light' : 'dark'} /> : children}
    </button>
  );
};

export default memo(Button);
