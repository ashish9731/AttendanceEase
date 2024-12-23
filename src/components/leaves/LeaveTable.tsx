import React, { useState } from 'react';
import { Clock, Calendar } from 'lucide-react';
import { useEmployeeStore } from '../../stores/useEmployeeStore';
import { LeaveModal } from './LeaveModal';
import { LeaveTooltip } from './LeaveTooltip';

export function LeaveTable() {
  const { getAbsentEmployees } = useEmployeeStore();
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [tooltipEmployee, setTooltipEmployee] = useState<Employee | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const employeesOnLeave = getAbsentEmployees();

  const handleNameHover = (employee: Employee, event: React.MouseEvent) => {
    setTooltipEmployee(employee);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Employee
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Leave Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              From
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              To
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Duration
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employeesOnLeave.map((employee) => (
            <tr 
              key={employee.id} 
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => setSelectedEmployee(employee)}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div 
                  className="flex items-center"
                  onMouseEnter={(e) => handleNameHover(employee, e)}
                  onMouseLeave={() => setTooltipEmployee(null)}
                >
                  <img className="h-8 w-8 rounded-full" src={employee.avatar} alt="" />
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                    <div className="text-sm text-gray-500">{employee.department}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{employee.leave.history[0].type}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-900">{employee.leave.history[0].startDate}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-900">{employee.leave.history[0].endDate}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {employee.leave.history[0].type === 'Half Day' ? '0.5 day' : '1 day'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  employee.leave.history[0].status === 'Approved' ? 'bg-green-100 text-green-800' :
                  employee.leave.history[0].status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {employee.leave.history[0].status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {tooltipEmployee && (
        <LeaveTooltip
          employee={tooltipEmployee}
          position={tooltipPosition}
        />
      )}

      {selectedEmployee && (
        <LeaveModal
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
    </div>
  );
}