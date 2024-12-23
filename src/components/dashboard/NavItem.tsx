import React from 'react';
import { LucideIcon } from 'lucide-react';

interface NavItemProps {
  label: string;
  icon: LucideIcon;
  isActive: boolean;
  onClick: () => void;
}

export function NavItem({ label, icon: Icon, isActive, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-3 py-2 rounded-md transition-colors ${
        isActive 
          ? 'text-blue-600 bg-blue-50' 
          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
      }`}
    >
      <Icon className="h-5 w-5 mr-1" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}