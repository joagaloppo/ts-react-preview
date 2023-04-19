import { memo } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, ...props }) => {
  return (
    <div className="flex min-h-[100svh] w-full items-center justify-center bg-gray-100 sm:p-12" {...props}>
      {children}
    </div>
  );
};

export default memo(Layout);
