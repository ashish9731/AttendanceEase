import React from 'react';
import { Filter } from 'lucide-react';

interface DepartmentFilterProps {
  departments: string[];
  value: string;
  onChange: (value: string) => void;
}

export function DepartmentFilter({ departments, value, onChange }: DepartmentFilterProps) {
  return (
    <div className="flex items-center space-x-4">
      <select
        className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {departments.map(dept => (
          <option key={dept} value={dept}>{dept}</option>
        ))}
      </select>
      <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
        <Filter className="h-5 w-5 mr-2" />
        Filters
      </button>
    </div>
  );
}