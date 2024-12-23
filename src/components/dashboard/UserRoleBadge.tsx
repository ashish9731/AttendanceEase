import React from 'react';
import { Shield } from 'lucide-react';

interface UserRoleBadgeProps {
  role: string;
}

export function UserRoleBadge({ role }: UserRoleBadgeProps) {
  const getRoleStyles = () => {
    switch (role) {
      case 'super_admin':
        return 'bg-purple-100 text-purple-800';
      case 'admin':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleDisplay = () => {
    switch (role) {
      case 'super_admin':
        return 'Super Admin';
      case 'admin':
        return 'Admin';
      default:
        return 'Employee';
    }
  };

  return (
    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${getRoleStyles()}`}>
      <Shield className="h-3 w-3" />
      <span className="text-xs font-medium">{getRoleDisplay()}</span>
    </div>
  );
}