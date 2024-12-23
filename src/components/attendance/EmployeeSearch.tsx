import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '../ui/Input';
import { SearchResults } from './SearchResults';

export function EmployeeSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // Mock data - replace with actual API call
  const mockEmployees: Employee[] = [
    {
      id: '1',
      name: 'John Doe',
      department: 'Engineering',
      employeeId: 'EMP001'
    }
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  const filteredEmployees = mockEmployees.filter(emp => 
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.employeeId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-6">Search Employee</h2>
      <div className="space-y-4">
        <Input
          icon={Search}
          type="text"
          placeholder="Search by name or employee ID"
          value={searchQuery}
          onChange={handleSearch}
        />
        {searchQuery && (
          <SearchResults 
            employees={filteredEmployees}
            onSelect={handleSelectEmployee}
          />
        )}
      </div>
    </div>
  );
}