import React from 'react';
import { X, Calendar, Clock, FileText } from 'lucide-react';
import { Button } from '../ui/Button';

interface LeaveModalProps {
  employee: any;
  onClose: () => void;
}

export function LeaveModal({ employee, onClose }: LeaveModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-orange-600" />
                <span className="text-orange-600 font-medium">Leave Duration</span>
              </div>
              <p className="text-2xl font-bold mt-2">{employee.leave.duration} Days</p>
              <p className="text-sm text-gray-600 mt-1">
                {employee.leave.startDate} - {employee.leave.endDate}
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <span className="text-blue-600 font-medium">Leave Type</span>
              </div>
              <p className="text-2xl font-bold mt-2">{employee.leave.type}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Leave Reason</h3>
            <p className="text-gray-700">{employee.leave.reason}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Leave History</h3>
            <div className="space-y-3">
              {employee.leave.history.map((item: any, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>{item.date}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === 'Approved' ? 'bg-green-100 text-green-800' :
                    item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
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