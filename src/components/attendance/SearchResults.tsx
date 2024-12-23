import React from 'react';

interface SearchResultsProps {
  employees: Employee[];
  onSelect: (employee: Employee) => void;
}

export function SearchResults({ employees, onSelect }: SearchResultsProps) {
  if (employees.length === 0) {
    return (
      <div className="text-gray-500 py-2">
        No employees found
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {employees.map(employee => (
        <div
          key={employee.id}
          className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
          onClick={() => onSelect(employee)}
        >
          <div className="font-medium text-gray-900">{employee.name}</div>
          <div className="text-sm text-gray-500">
            {employee.employeeId} • {employee.department}
          </div>
        </div>
      ))}
    </div>
  );
}