import React from 'react';
import { Calendar, Clock, Sun } from 'lucide-react';

interface LeaveTooltipProps {
  employee: Employee;
  position: { x: number; y: number };
}

export function LeaveTooltip({ employee, position }: LeaveTooltipProps) {
  const leaveTypes = [
    {
      type: 'Annual Leave',
      icon: Calendar,
      used: employee.leave.balance.annual,
      total: 14,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      type: 'Sick Leave',
      icon: Clock,
      used: employee.leave.balance.sick,
      total: 10,
      color: 'bg-red-50 text-red-600'
    },
    {
      type: 'Personal Leave',
      icon: Sun,
      used: employee.leave.balance.personal,
      total: 5,
      color: 'bg-yellow-50 text-yellow-600'
    }
  ];

  return (
    <div 
      className="fixed z-50 bg-white rounded-lg shadow-lg p-4 min-w-[300px]"
      style={{
        top: `${position.y + 20}px`,
        left: `${position.x + 20}px`
      }}
    >
      <div className="space-y-4">
        {leaveTypes.map((leave) => (
          <div key={leave.type} className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${leave.color}`}>
              <leave.icon className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">{leave.type}</div>
              <div className="flex items-center justify-between mt-1">
                <div className="text-xs text-gray-500">
                  {leave.total - leave.used} / {leave.total} days remaining
                </div>
                <div className="text-xs text-gray-500">
                  Used: {leave.used} days
                </div>
              </div>
              <div className="mt-1 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${leave.color.replace('50', '500')}`}
                  style={{ width: `${(leave.used / leave.total) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}