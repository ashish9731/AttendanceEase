import React from 'react';
import { User, Clock, Calendar } from 'lucide-react';

const mockData = {
  employees: [
    {
      name: 'John Doe',
      id: 'EMP001',
      department: 'Engineering',
      attendanceRate: '96%',
      avgWorkHours: '8.2',
      leavesTaken: 3,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces'
    },
    {
      name: 'Jane Smith',
      id: 'EMP002',
      department: 'Design',
      attendanceRate: '94%',
      avgWorkHours: '7.9',
      leavesTaken: 2,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=faces'
    }
  ]
};

export function EmployeeReport() {
  return (
    <div className="space-y-6">
      {mockData.employees.map((employee, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={employee.avatar}
              alt={employee.name}
              className="h-12 w-12 rounded-full"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{employee.name}</h3>
              <div className="text-sm text-gray-500">
                {employee.id} • {employee.department}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-green-600" />
                <div className="text-green-600 font-semibold">Attendance Rate</div>
              </div>
              <div className="text-2xl font-bold text-green-700 mt-2">{employee.attendanceRate}</div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <div className="text-blue-600 font-semibold">Avg. Work Hours</div>
              </div>
              <div className="text-2xl font-bold text-blue-700 mt-2">{employee.avgWorkHours}</div>
            </div>

            <div className="bg-orange-50 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-orange-600" />
                <div className="text-orange-600 font-semibold">Leaves Taken</div>
              </div>
              <div className="text-2xl font-bold text-orange-700 mt-2">{employee.leavesTaken}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}