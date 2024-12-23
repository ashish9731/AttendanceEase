import React, { useState } from 'react';
import { Navigation } from '../components/dashboard/Navigation';
import { DateFilter } from '../components/dashboard/DateFilter';
import { AttendanceTable } from '../components/attendance/AttendanceTable';
import { MonthCalendar } from '../components/calendar/MonthCalendar';
import { DaySummaryModal } from '../components/calendar/DaySummaryModal';
import { useEmployeeStore } from '../stores/useEmployeeStore';

export function AttendancePage() {
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
          <DateFilter />
        </div>
        <div className="space-y-6">
          <MonthCalendar type="attendance" onDayClick={handleDayClick} />
          <AttendanceTable />
        </div>

        {selectedDate && daySummary && (
          <DaySummaryModal
            date={selectedDate}
            type="attendance"
            summary={daySummary}
            employees={getEmployeesByDate(selectedDate)}
            onClose={() => setSelectedDate(null)}
          />
        )}
      </main>
    </div>
  );
}