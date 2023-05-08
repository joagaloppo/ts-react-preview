import { memo } from 'react';
import clsx from 'clsx';

interface BoxProps {
  children: React.ReactNode;
  className?: string;
}

const Box: React.FC<BoxProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={clsx('flex w-full max-w-md flex-col rounded-lg bg-white px-8 py-12 shadow sm:px-12', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default memo(Box);
