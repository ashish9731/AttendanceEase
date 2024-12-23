import React from 'react';
import { Navigation } from '../components/dashboard/Navigation';
import { DateFilter } from '../components/dashboard/DateFilter';
import { DashboardStats } from '../components/dashboard/DashboardStats';
import { DepartmentOverview } from '../components/dashboard/DepartmentOverview';

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <DateFilter />
        </div>
        <div className="space-y-6">
          <DashboardStats />
          <DepartmentOverview />
        </div>
      </main>
    </div>
  );
}