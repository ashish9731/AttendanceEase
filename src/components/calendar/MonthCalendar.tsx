import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CalendarDay } from './CalendarDay';
import { useMonthCalendar } from '../../hooks/useMonthCalendar';

interface MonthCalendarProps {
  type: 'attendance' | 'leave';
  onDayClick: (date: Date, summary: any) => void;
}

export function MonthCalendar({ type, onDayClick }: MonthCalendarProps) {
  const { 
    currentMonth,
    currentYear,
    days,
    previousMonth,
    nextMonth
  } = useMonthCalendar();

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">
          {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
        </h2>
        <div className="flex items-center space-x-2">
          <button 
            onClick={previousMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button 
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekDays.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
        
        {days.map((day, index) => (
          <CalendarDay
            key={index}
            date={day}
            type={type}
            onClick={onDayClick}
          />
        ))}
      </div>
    </div>
  );
}