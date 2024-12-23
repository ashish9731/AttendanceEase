import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { Dashboard } from './pages/Dashboard';
import { Hero } from './components/home/Hero';
import { AttendancePage } from './pages/AttendancePage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';
import { LateCheckinsPage } from './pages/LateCheckinsPage';
import { LeavePage } from './pages/LeavePage';
import { PoliciesPage } from './pages/PoliciesPage';
import { EmployeeChangesPage } from './pages/EmployeeChangesPage';

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      {!isAuthenticated ? (
        <Routes>
          <Route path="*" element={<Hero />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/employee-changes" element={<EmployeeChangesPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/late-checkins" element={<LateCheckinsPage />} />
          <Route path="/leave" element={<LeavePage />} />
          <Route path="/policies" element={<PoliciesPage />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}