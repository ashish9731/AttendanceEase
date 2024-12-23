import React from 'react';
import { X, Calendar, Clock, User } from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';
import { Button } from '../ui/Button';

interface DaySummaryModalProps {
  date: Date;
  type: 'attendance' | 'leave';
  summary: any;
  employees: Employee[];
  onClose: () => void;
}

export function DaySummaryModal({ date, type, summary, employees, onClose }: DaySummaryModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Calendar className="h-6 w-6 text-blue-600" />
              <div>
                <h2 className="text-xl font-semibold">{formatDate(date)}</h2>
                <p className="text-gray-500">
                  {type === 'attendance' ? 'Attendance Summary' : 'Leave Summary'}
                </p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-3 gap-4 mb-6">
            {type === 'attendance' ? (
              <>
                <div className="bg-green-50 p-4 rounded-lg">
                  <span className="text-green-600 font-medium">Present</span>
                  <p className="text-2xl font-bold text-green-700">{summary.present}</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <span className="text-yellow-600 font-medium">Late</span>
                  <p className="text-2xl font-bold text-yellow-700">{summary.late}</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <span className="text-red-600 font-medium">Absent</span>
                  <p className="text-2xl font-bold text-red-700">{summary.absent}</p>
                </div>
              </>
            ) : (
              <>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <span className="text-blue-600 font-medium">Total Leaves</span>
                  <p className="text-2xl font-bold text-blue-700">{summary.total}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <span className="text-green-600 font-medium">Approved</span>
                  <p className="text-2xl font-bold text-green-700">{summary.approved}</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <span className="text-yellow-600 font-medium">Pending</span>
                  <p className="text-2xl font-bold text-yellow-700">{summary.pending}</p>
                </div>
              </>
            )}
          </div>

          <div className="space-y-4">
            {employees.map((employee) => (
              <div key={employee.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <img src={employee.avatar} alt="" className="h-10 w-10 rounded-full" />
                  <div>
                    <div className="font-medium">{employee.name}</div>
                    <div className="text-sm text-gray-500">{employee.department}</div>
                  </div>
                </div>
                {type === 'attendance' ? (
                  <div className="flex items-center space-x-4">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>{employee.attendance.today.checkIn}</span>
                  </div>
                ) : (
                  <div className="text-sm">
                    <div className="font-medium">{employee.leave.history[0]?.type}</div>
                    <div className="text-gray-500">{employee.leave.history[0]?.reason}</div>
                  </div>
                )}
              </div>
            ))}
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