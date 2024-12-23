import React from 'react';
import { Calendar, Clock, Sun } from 'lucide-react';

const balanceTypes = [
  { 
    type: 'Annual Leave',
    icon: Calendar,
    used: 5,
    total: 14,
    color: 'bg-blue-50 text-blue-600'
  },
  { 
    type: 'Sick Leave',
    icon: Clock,
    used: 2,
    total: 10,
    color: 'bg-red-50 text-red-600'
  },
  { 
    type: 'Personal Leave',
    icon: Sun,
    used: 1,
    total: 5,
    color: 'bg-yellow-50 text-yellow-600'
  }
];

export function LeaveBalance() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {balanceTypes.map((balance) => (
        <div key={balance.type} className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${balance.color}`}>
              <balance.icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{balance.type}</h3>
              <div className="mt-1 flex items-center space-x-2">
                <span className="text-2xl font-bold">{balance.total - balance.used}</span>
                <span className="text-sm text-gray-500">/ {balance.total} days remaining</span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div className="text-xs text-gray-600">Used: {balance.used} days</div>
                <div className="text-xs text-gray-600">Available: {balance.total - balance.used} days</div>
              </div>
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100">
                <div
                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${balance.color.replace('50', '500')}`}
                  style={{ width: `${(balance.used / balance.total) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}