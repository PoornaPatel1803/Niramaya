import React, { useState } from 'react';
import Sidebar from '../Components/sidebar';

const SidebarLayout = ({ children, userType = "doctor" }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex h-screen">
      <Sidebar userType={userType} isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className={`flex-1 bg-gray-100 transition-all duration-300 ${isOpen ? 'ml-64 p-6' : 'ml-20 p-4'}`}>
        {children}
      </main>
    </div>
  );
};

export default SidebarLayout;