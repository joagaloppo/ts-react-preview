import React from 'react';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex w-full items-center justify-center sm:p-12">{children}</div>
    </div>
  );
}

export default Layout;
