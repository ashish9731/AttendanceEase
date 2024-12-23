import React from 'react';
import { Navigation } from '../components/dashboard/Navigation';
import { WeeklyAttendance } from '../components/attendance/WeeklyAttendance';

export function LateCheckinsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Late Check-ins</h1>
        <WeeklyAttendance />
      </main>
    </div>
  );
}