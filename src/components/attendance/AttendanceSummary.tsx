import React from 'react';

export function AttendanceSummary() {
  const summaryItems = [
    { label: 'Days', value: 'Hours', color: 'bg-blue-100' },
    { label: 'Payable Days', value: '4 Days', color: 'bg-yellow-100' },
    { label: 'Present', value: '2 Days', color: 'bg-green-100' },
    { label: 'On Duty', value: '0 Days', color: 'bg-purple-100' },
    { label: 'Paid leave', value: '2 Days', color: 'bg-orange-100' },
    { label: 'Holidays', value: '0 Days', color: 'bg-cyan-100' },
    { label: 'Weekend', value: '1 Days', color: 'bg-amber-100' }
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {summaryItems.map((item) => (
        <div
          key={item.label}
          className={`${item.color} rounded-lg p-4 flex-1 min-w-[150px]`}
        >
          <div className="text-sm font-medium">{item.label}</div>
          <div className="text-lg font-semibold mt-1">{item.value}</div>
        </div>
      ))}
    </div>
  );
}