import React from 'react';
import { Calendar, TrendingUp, TrendingDown } from 'lucide-react';

const mockData = {
  summary: {
    totalWorkingDays: 22,
    averageAttendance: '92%',
    totalLeaves: 45,
    averageWorkHours: '7.8'
  },
  trends: [
    { label: 'Attendance Rate', value: '92%', trend: 'up', change: '+2.5%' },
    { label: 'Average Work Hours', value: '7.8 hrs', trend: 'down', change: '-0.3%' },
    { label: 'Leave Utilization', value: '12%', trend: 'up', change: '+1.2%' }
  ]
};

export function MonthlyReport() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-blue-600 font-semibold">Working Days</div>
            <div className="text-2xl font-bold text-blue-700">{mockData.summary.totalWorkingDays}</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-green-600 font-semibold">Avg. Attendance</div>
            <div className="text-2xl font-bold text-green-700">{mockData.summary.averageAttendance}</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="text-orange-600 font-semibold">Total Leaves</div>
            <div className="text-2xl font-bold text-orange-700">{mockData.summary.totalLeaves}</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-purple-600 font-semibold">Avg. Hours</div>
            <div className="text-2xl font-bold text-purple-700">{mockData.summary.averageWorkHours}</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Monthly Trends</h3>
        <div className="space-y-4">
          {mockData.trends.map((item, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              {item.trend === 'up' ? (
                <TrendingUp className="h-5 w-5 text-green-500" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-500" />
              )}
              <div>
                <div className="font-medium">{item.label}</div>
                <div className="text-sm text-gray-500">{item.value}</div>
              </div>
              <div className={`ml-auto font-semibold ${
                item.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {item.change}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}