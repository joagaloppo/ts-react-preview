import { InputHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'filled' | 'outline';
  padding?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  error?: string | undefined;
}

const variants = {
  outline: 'border border-gray-300 text-gray-900',
  filled: 'border border-gray-300 text-gray-900',
};

const paddings = {
  xs: 'py-2 px-3',
  sm: 'py-2.5 px-3',
  md: 'py-3 px-3',
  lg: 'py-3.5 px-3.5',
  xl: 'py-4 px-4',
};

const errorStyle = 'bg-red-50 border-red-800/20 text-red-800/80 placeholder-red-800/80';
const transition = 'transition duration-300 ease-in-out';
const rest = 'w-full rounded-sm text-base outline-none';

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant = 'outline', padding = 'sm', className, error, ...props }, ref) => {
    return (
      <div>
        <input
          ref={ref}
          className={clsx(variants[variant], paddings[padding], transition, rest, error && errorStyle, className)}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-800/80">{error}</p>}
      </div>
    );
  }
);

export default Input;
