import React, { useState } from 'react';
import { Navigation } from '../components/dashboard/Navigation';
import { EmployeeChangesStats } from '../components/employees/EmployeeChangesStats';
import { EmployeeChangesList } from '../components/employees/EmployeeChangesList';

export function EmployeeChangesPage() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter'>('month');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Employee Changes</h1>
          <p className="text-gray-500 mt-1">Track new hires and resignations</p>
        </div>
        
        <div className="space-y-6">
          <EmployeeChangesStats 
            timeRange={timeRange} 
            onTimeRangeChange={setTimeRange} 
          />
          <EmployeeChangesList timeRange={timeRange} />
        </div>
      </main>
    </div>
  );
}