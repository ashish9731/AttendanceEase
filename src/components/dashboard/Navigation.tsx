import React from 'react';
import { Home, UserCheck, FileText, Settings, BookOpen, LogIn, Users } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { NavItem } from './NavItem';
import { UserProfile } from './UserProfile';
import { Button } from '../ui/Button';

const navItems = [
  { label: 'Dashboard', icon: Home, path: '/dashboard' },
  { label: 'Attendance', icon: UserCheck, path: '/attendance' },
  { label: 'Employee Changes', icon: Users, path: '/employee-changes' },
  { label: 'Leave', icon: FileText, path: '/leave' },
  { label: 'Reports', icon: FileText, path: '/reports' },
  { label: 'Settings', icon: Settings, path: '/settings' },
  { label: 'Policies', icon: BookOpen, path: '/policies' },
];

export function Navigation() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span 
              className="text-xl font-bold text-blue-600 cursor-pointer" 
              onClick={() => handleNavigation('/dashboard')}
            >
              AttendEase
            </span>
          </div>
          <div className="flex items-center space-x-6">
            {isAuthenticated && navItems.map((item) => (
              <NavItem
                key={item.label}
                {...item}
                isActive={location.pathname === item.path}
                onClick={() => handleNavigation(item.path)}
              />
            ))}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <UserProfile user={user} />
                <Button variant="secondary" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Button onClick={() => handleNavigation('/login')}>
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}