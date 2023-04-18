import React from 'react';

function Box({ children }: { children: React.ReactNode }) {
  return <div className="flex w-full max-w-md flex-col rounded-sm bg-white p-8 shadow sm:p-12">{children}</div>;
}

export default Box;
