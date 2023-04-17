import React from "react";

function Box({ children }: { children: React.ReactNode }) {
  return <div className="bg-white flex flex-col w-full p-8 sm:rounded-lg shadow sm:max-w-sm sm:px-10 sm:py-12">{children}</div>;
}

export default Box;
