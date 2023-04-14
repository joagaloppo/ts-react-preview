import React from 'react';

function Layout( { children } : { children: React.ReactNode } ) {
    return (
        <div className="flex h-screen bg-gray-100">
            <div className="w-full flex items-center justify-center px-4 py-12">
                {children}
            </div>
        </div>
    );
}

export default Layout;