import React from 'react';
import { Calendar, Clock } from 'lucide-react';

const mockData = [
  {
    date: '2024-03-15',
    totalPresent: 45,
    totalAbsent: 5,
    totalLate: 2,
    details: [
      { time: '09:00 AM', event: 'Morning Check-in Peak', count: 40 },
      { time: '01:00 PM', event: 'Lunch Break', count: 45 },
      { time: '05:00 PM', event: 'Evening Check-out Peak', count: 43 }
    ]
  }
];

export function DailyAttendanceReport() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-green-600 font-semibold">Present</div>
            <div className="text-2xl font-bold text-green-700">45</div>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <div className="text-red-600 font-semibold">Absent</div>
            <div className="text-2xl font-bold text-red-700">5</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="text-yellow-600 font-semibold">Late</div>
            <div className="text-2xl font-bold text-yellow-700">2</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Daily Timeline</h3>
        <div className="space-y-4">
          {mockData[0].details.map((item, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <Clock className="h-5 w-5 text-gray-500" />
              <div>
                <div className="font-medium">{item.time}</div>
                <div className="text-sm text-gray-500">{item.event}</div>
              </div>
              <div className="ml-auto font-semibold">{item.count} employees</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}