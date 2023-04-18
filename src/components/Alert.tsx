import React from 'react';
import clsx from 'clsx';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'filled' | 'outline';
  color?: 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

function Alert({ children, color = 'warning', size = 'sm', className, ...props }: AlertProps) {
  const colors = {
    success: 'bg-green-50 text-green-800/80 border-green-800/20',
    danger: 'bg-red-50 text-red-800/80 border-red-800/20',
    warning: 'bg-yellow-50 text-yellow-800/80 border-yellow-800/20',
    info: 'bg-blue-50 text-blue-800/80 border-blue-800/20',
    light: 'bg-gray-50 text-gray-800/80 border-gray-800/20',
    dark: 'bg-gray-800/20 text-gray-800/80 border-gray-800/20',
  };

  const sizes = {
    xs: 'py-2 px-3',
    sm: 'py-2.5 px-3',
    md: 'py-3 px-3',
    lg: 'py-3.5 px-3.5',
    xl: 'py-4 px-4',
  };

  return (
    <div className={clsx(colors[color], sizes[size], 'w-full rounded-sm border p-3.5', className)} {...props}>
      {children}
    </div>
  );
}

export default Alert;
