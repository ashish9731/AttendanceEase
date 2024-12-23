import React, { useState } from 'react';
import { Navigation } from '../components/dashboard/Navigation';
import { LeaveTable } from '../components/leaves/LeaveTable';
import { MonthCalendar } from '../components/calendar/MonthCalendar';
import { DaySummaryModal } from '../components/calendar/DaySummaryModal';
import { useEmployeeStore } from '../stores/useEmployeeStore';

export function LeavePage() {
  const { getEmployeesByDate } = useEmployeeStore();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [daySummary, setDaySummary] = useState<any>(null);

  const handleDayClick = (date: Date, summary: any) => {
    setSelectedDate(date);
    setDaySummary(summary);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Leave Management</h1>
        <div className="space-y-6">
          <MonthCalendar type="leave" onDayClick={handleDayClick} />
          <LeaveTable />
        </div>

        {selectedDate && daySummary && (
          <DaySummaryModal
            date={selectedDate}
            type="leave"
            summary={daySummary}
            employees={getEmployeesByDate(selectedDate)}
            onClose={() => setSelectedDate(null)}
          />
        )}
      </main>
    </div>
  );
}