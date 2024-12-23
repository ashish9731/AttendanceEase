import React from 'react';
import { Menu, UserCircle, LogOut } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { LoginForm } from '../auth/LoginForm';
import { SignupForm } from '../auth/SignupForm';
import { AuthTabs } from '../auth/AuthTabs';
import { useModal } from '../../hooks/useModal';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/Button';

export function Navbar() {
  const { isOpen, open, close } = useModal();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-blue-600">AttendEase</span>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-700">Welcome, {user?.name}</span>
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <UserCircle className="h-8 w-8 text-gray-600" />
                  )}
                  <Button variant="secondary" onClick={logout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <Button variant="secondary" onClick={open}>
                Login
              </Button>
            )}
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={close}>
        <div className="p-6">
          <AuthTabs>
            <LoginForm />
            <SignupForm />
          </AuthTabs>
        </div>
      </Modal>
    </nav>
  );
}