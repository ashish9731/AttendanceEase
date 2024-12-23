import React from 'react';
import { Users, Clock, Calendar } from 'lucide-react';

const mockData = {
  departments: [
    {
      name: 'Engineering',
      employeeCount: 25,
      attendanceRate: '94%',
      avgWorkHours: '7.9',
      leaveUtilization: '8%'
    },
    {
      name: 'Design',
      employeeCount: 12,
      attendanceRate: '92%',
      avgWorkHours: '7.8',
      leaveUtilization: '10%'
    },
    {
      name: 'Marketing',
      employeeCount: 8,
      attendanceRate: '90%',
      avgWorkHours: '7.7',
      leaveUtilization: '12%'
    }
  ]
};

export function DepartmentReport() {
  return (
    <div className="space-y-6">
      {mockData.departments.map((dept, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{dept.name}</h3>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-gray-400" />
              <span className="text-gray-600">{dept.employeeCount} employees</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-green-600" />
                <div className="text-green-600 font-semibold">Attendance Rate</div>
              </div>
              <div className="text-2xl font-bold text-green-700 mt-2">{dept.attendanceRate}</div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <div className="text-blue-600 font-semibold">Avg. Work Hours</div>
              </div>
              <div className="text-2xl font-bold text-blue-700 mt-2">{dept.avgWorkHours}</div>
            </div>
            
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-orange-600" />
                <div className="text-orange-600 font-semibold">Leave Utilization</div>
              </div>
              <div className="text-2xl font-bold text-orange-700 mt-2">{dept.leaveUtilization}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}