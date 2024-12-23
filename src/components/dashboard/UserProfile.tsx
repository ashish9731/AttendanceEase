import React from 'react';
import { User as UserIcon } from 'lucide-react';
import { UserRoleBadge } from './UserRoleBadge';

interface User {
  name?: string;
  avatar?: string;
  role?: string;
}

interface UserProfileProps {
  user: User | null;
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="flex items-center space-x-3">
      {user?.role && <UserRoleBadge role={user.role} />}
      <span className="text-sm text-gray-700">{user?.name}</span>
      {user?.avatar ? (
        <img
          src={user.avatar}
          alt={user.name}
          className="h-8 w-8 rounded-full"
        />
      ) : (
        <UserIcon className="h-8 w-8 text-gray-600" />
      )}
    </div>
  );
}