import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { departments } from '../../data/departments';
import { DepartmentModal } from './DepartmentModal';

export function DepartmentList() {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {departments.map((dept) => (
          <div
            key={dept.id}
            onClick={() => setSelectedDepartment(dept.name)}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{dept.name}</h3>
                <p className="text-sm text-gray-500">{dept.employeeCount} Employees</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedDepartment && (
        <DepartmentModal
          department={selectedDepartment}
          onClose={() => setSelectedDepartment(null)}
        />
      )}
    </>
  );
}