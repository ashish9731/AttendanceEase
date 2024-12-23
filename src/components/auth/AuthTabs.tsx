import React, { useState } from 'react';

interface AuthTabsProps {
  children: React.ReactNode[];
}

export function AuthTabs({ children }: AuthTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="flex border-b mb-6">
        <button
          className={`flex-1 py-3 ${activeTab === 0 ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab(0)}
        >
          Login
        </button>
        <button
          className={`flex-1 py-3 ${activeTab === 1 ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab(1)}
        >
          Sign Up
        </button>
      </div>
      {children[activeTab]}
    </div>
  );
}