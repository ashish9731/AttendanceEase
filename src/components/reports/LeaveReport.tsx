import React from 'react';
import { Calendar, Clock, User } from 'lucide-react';

const mockData = {
  summary: {
    totalLeaves: 45,
    approvedLeaves: 38,
    pendingLeaves: 7,
    averageDuration: '2.3'
  },
  leaveTypes: [
    { type: 'Sick Leave', count: 15, percentage: '33%' },
    { type: 'Vacation', count: 20, percentage: '44%' },
    { type: 'Personal', count: 10, percentage: '23%' }
  ]
};

export function LeaveReport() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-blue-600 font-semibold">Total Leaves</div>
            <div className="text-2xl font-bold text-blue-700">{mockData.summary.totalLeaves}</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-green-600 font-semibold">Approved</div>
            <div className="text-2xl font-bold text-green-700">{mockData.summary.approvedLeaves}</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="text-yellow-600 font-semibold">Pending</div>
            <div className="text-2xl font-bold text-yellow-700">{mockData.summary.pendingLeaves}</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-purple-600 font-semibold">Avg. Duration</div>
            <div className="text-2xl font-bold text-purple-700">{mockData.summary.averageDuration} days</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Leave Distribution</h3>
        <div className="space-y-4">
          {mockData.leaveTypes.map((type, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <div className="font-medium">{type.type}</div>
                <div className="text-sm text-gray-500">{type.count} leaves</div>
              </div>
              <div className="ml-auto font-semibold">{type.percentage}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}