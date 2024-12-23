import React from 'react';
import { X, Clock, Calendar, TrendingUp } from 'lucide-react';
import { Button } from '../ui/Button';

interface AttendanceModalProps {
  employee: any;
  onClose: () => void;
}

export function AttendanceModal({ employee, onClose }: AttendanceModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={employee.avatar}
                alt={employee.name}
                className="h-12 w-12 rounded-full"
              />
              <div>
                <h2 className="text-xl font-semibold">{employee.name}</h2>
                <p className="text-gray-500">{employee.id} • {employee.department}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Today's Attendance */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Today's Attendance</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span className="text-blue-600 font-medium">Check In</span>
                </div>
                <p className="text-2xl font-bold mt-2">{employee.attendance.today.checkIn}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-green-600" />
                  <span className="text-green-600 font-medium">Check Out</span>
                </div>
                <p className="text-2xl font-bold mt-2">{employee.attendance.today.checkOut}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  <span className="text-purple-600 font-medium">Hours Worked</span>
                </div>
                <p className="text-2xl font-bold mt-2">{employee.attendance.today.hoursWorked}</p>
              </div>
            </div>
          </div>

          {/* Weekly Attendance */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Weekly Attendance</h3>
            <div className="bg-white border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check In</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check Out</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hours</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {employee.attendance.weekly.map((day: any, index: number) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{day.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{day.checkIn}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{day.checkOut}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          day.status === 'Present' ? 'bg-green-100 text-green-800' :
                          day.status === 'Late' ? 'bg-yellow-100 text-yellow-800' :
                          day.status === 'Early' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {day.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{day.hoursWorked}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Monthly Summary */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Monthly Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <span className="text-green-600 font-medium">Present Days</span>
                <p className="text-2xl font-bold mt-2">{employee.attendance.monthly.presentDays}</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <span className="text-yellow-600 font-medium">Late Days</span>
                <p className="text-2xl font-bold mt-2">{employee.attendance.monthly.lateDays}</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <span className="text-red-600 font-medium">Absent Days</span>
                <p className="text-2xl font-bold mt-2">{employee.attendance.monthly.absentDays}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <span className="text-blue-600 font-medium">Avg Hours/Day</span>
                <p className="text-2xl font-bold mt-2">{employee.attendance.monthly.avgHoursPerDay}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t bg-gray-50">
          <div className="flex justify-end">
            <Button variant="secondary" onClick={onClose}>Close</Button>
          </div>
        </div>
      </div>
    </div>
  );
}