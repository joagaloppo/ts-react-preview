import React from 'react';

function Box({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col bg-white p-8 shadow sm:max-w-sm sm:rounded-lg sm:px-10 sm:py-12">
      {children}
    </div>
  );
}

export default Box;
