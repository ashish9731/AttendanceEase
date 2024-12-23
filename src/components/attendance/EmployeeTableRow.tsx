import React from 'react';
import { Clock } from 'lucide-react';

interface EmployeeTableRowProps {
  employee: Employee;
  onClick: () => void;
}

export function EmployeeTableRow({ employee, onClick }: EmployeeTableRowProps) {
  return (
    <tr className="hover:bg-gray-50 cursor-pointer" onClick={onClick}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <img className="h-8 w-8 rounded-full" src={employee.avatar} alt="" />
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{employee.name}</div>
            <div className="text-sm text-gray-500">{employee.employeeId}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {employee.department}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <Clock className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-sm text-gray-900">{employee.attendance.today.checkIn}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <Clock className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-sm text-gray-900">{employee.attendance.today.checkOut}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {employee.attendance.today.hoursWorked}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          employee.status === 'Present' ? 'bg-green-100 text-green-800' :
          employee.status === 'Late' ? 'bg-red-100 text-red-800' :
          employee.status === 'Early' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {employee.status}
        </span>
      </td>
    </tr>
  );
}