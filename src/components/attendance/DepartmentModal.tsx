import React from 'react';
import { X, Users, Clock, Calendar, DollarSign } from 'lucide-react';
import { Button } from '../ui/Button';

interface DepartmentModalProps {
  department: string;
  onClose: () => void;
}

export function DepartmentModal({ department, onClose }: DepartmentModalProps) {
  // Calculate department statistics
  const stats = {
    totalEmployees: 8, // This will be dynamic based on department
    attendance: {
      present: '92%',
      onLeave: '5%',
      late: '3%'
    },
    workHours: {
      today: '7.5h',
      weekly: '37.5h',
      monthly: '150h'
    },
    payroll: {
      hourlyRate: '$25',
      monthlyPay: '$3,750',
      ytdPay: '$45,000'
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <h2 className="text-xl font-semibold">{department}</h2>
                <p className="text-gray-500">{stats.totalEmployees} Employees</p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Today's Summary */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Today's Summary</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <span className="text-green-600 font-medium">Present</span>
                <p className="text-2xl font-bold mt-2">{stats.attendance.present}</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <span className="text-yellow-600 font-medium">On Leave</span>
                <p className="text-2xl font-bold mt-2">{stats.attendance.onLeave}</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <span className="text-red-600 font-medium">Late</span>
                <p className="text-2xl font-bold mt-2">{stats.attendance.late}</p>
              </div>
            </div>
          </div>

          {/* Work Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Work Hours</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <span className="text-blue-600 font-medium">Today</span>
                <p className="text-2xl font-bold mt-2">{stats.workHours.today}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <span className="text-blue-600 font-medium">This Week</span>
                <p className="text-2xl font-bold mt-2">{stats.workHours.weekly}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <span className="text-blue-600 font-medium">This Month</span>
                <p className="text-2xl font-bold mt-2">{stats.workHours.monthly}</p>
              </div>
            </div>
          </div>

          {/* Payroll Summary */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Payroll Summary</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <span className="text-purple-600 font-medium">Hourly Rate</span>
                <p className="text-2xl font-bold mt-2">{stats.payroll.hourlyRate}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <span className="text-purple-600 font-medium">Monthly Pay</span>
                <p className="text-2xl font-bold mt-2">{stats.payroll.monthlyPay}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <span className="text-purple-600 font-medium">YTD Pay</span>
                <p className="text-2xl font-bold mt-2">{stats.payroll.ytdPay}</p>
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