import { memo, InputHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  padding?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  error?: string | undefined;
  disabled?: boolean;
}

const paddings = {
  xs: 'py-2 px-3',
  sm: 'py-2.5 px-3',
  md: 'py-3 px-3',
  lg: 'py-3.5 px-3.5',
  xl: 'py-4 px-4',
};

const errorStyle = 'bg-red-50 border-red-800/20 text-red-800/80 placeholder-red-800/80';

const transition = 'transition duration-300 ease-in-out';

const rest = 'border border-gray-300 text-gray-900 w-full rounded-lg text-base outline-none';

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ padding = 'sm', className, disabled = false, error, ...props }, ref) => {
    return (
      <div>
        <input
          ref={ref}
          className={clsx(paddings[padding], transition, rest, error && errorStyle, className)}
          disabled={disabled}
          readOnly={disabled}
          aria-disabled={disabled}
          aria-readonly={disabled}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-800/80">{error}</p>}
      </div>
    );
  }
);

export default memo(Input);
