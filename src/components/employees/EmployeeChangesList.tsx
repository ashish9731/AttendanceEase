import React from 'react';
import { useEmployeeStore } from '../../stores/useEmployeeStore';
import { formatDate } from '../../utils/dateUtils';

interface EmployeeChangesListProps {
  timeRange: 'week' | 'month' | 'quarter';
}

export function EmployeeChangesList({ timeRange }: EmployeeChangesListProps) {
  const { getEmployeeChanges } = useEmployeeStore();
  const changes = getEmployeeChanges(timeRange);

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b">
        <h3 className="text-lg font-medium text-gray-900">Recent Changes</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {changes.map((change) => (
          <div key={change.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={change.employee.avatar}
                  alt=""
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {change.employee.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {change.type === 'hire' ? 'Joined as' : 'Left position as'}{' '}
                    {change.employee.position}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${
                  change.type === 'hire' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {change.type === 'hire' ? 'New Hire' : 'Resignation'}
                </p>
                <p className="text-sm text-gray-500">
                  {formatDate(new Date(change.date))}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}