import React from 'react';
import { useEmployeeStore } from '../../stores/useEmployeeStore';

interface CalendarDayProps {
  date: Date;
  type: 'attendance' | 'leave';
  onClick: (date: Date, summary: any) => void;
}

export function CalendarDay({ date, type, onClick }: CalendarDayProps) {
  const { getEmployeesByDate } = useEmployeeStore();
  const isToday = new Date().toDateString() === date.toDateString();
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;

  const summary = React.useMemo(() => {
    const employees = getEmployeesByDate(date);
    if (type === 'attendance') {
      return {
        present: employees.filter(e => e.status === 'Present' || e.status === 'Early').length,
        late: employees.filter(e => e.status === 'Late').length,
        absent: employees.filter(e => e.status === 'Absent').length
      };
    } else {
      return {
        total: employees.filter(e => e.status === 'Absent').length,
        approved: employees.filter(e => e.leave.history[0]?.status === 'Approved').length,
        pending: employees.filter(e => e.leave.history[0]?.status === 'Pending').length
      };
    }
  }, [date, type, getEmployeesByDate]);

  const getIndicatorColor = () => {
    if (type === 'attendance') {
      if (summary.absent > summary.present) return 'bg-red-400';
      if (summary.late > summary.present / 2) return 'bg-yellow-400';
      return 'bg-green-400';
    } else {
      if (summary.total === 0) return 'bg-gray-400';
      if (summary.pending > summary.approved) return 'bg-yellow-400';
      return 'bg-blue-400';
    }
  };

  return (
    <div
      onClick={() => onClick(date, summary)}
      className={`
        aspect-square p-2 border rounded-lg cursor-pointer
        ${isToday ? 'border-blue-500' : 'border-gray-200'}
        ${isWeekend ? 'bg-gray-50' : 'hover:bg-gray-50'}
      `}
    >
      <div className="flex flex-col h-full">
        <span className={`text-sm ${isToday ? 'font-bold text-blue-500' : 'text-gray-700'}`}>
          {date.getDate()}
        </span>
        {!isWeekend && (
          <div className="mt-auto">
            <div className={`h-1.5 rounded-full ${getIndicatorColor()}`} />
            <div className="mt-1 text-xs text-gray-500">
              {type === 'attendance' ? (
                `${summary.present}/${summary.present + summary.late + summary.absent}`
              ) : (
                summary.total > 0 ? `${summary.total} leaves` : ''
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}