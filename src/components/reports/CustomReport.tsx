import React, { useState } from 'react';
import { Filter, Calendar, Download, Plus } from 'lucide-react';
import { Button } from '../ui/Button';

interface ReportCriteria {
  name: string;
  type: 'attendance' | 'leave' | 'performance';
  dateRange: 'daily' | 'weekly' | 'monthly' | 'custom';
  departments: string[];
}

const departments = ['All Departments', 'Engineering', 'Design', 'Marketing', 'HR', 'Finance'];
const reportTypes = [
  { value: 'attendance', label: 'Attendance Report' },
  { value: 'leave', label: 'Leave Report' },
  { value: 'performance', label: 'Performance Report' }
];
const dateRanges = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'custom', label: 'Custom Range' }
];

export function CustomReport() {
  const [criteria, setCriteria] = useState<ReportCriteria>({
    name: '',
    type: 'attendance',
    dateRange: 'monthly',
    departments: ['All Departments']
  });

  const handleGenerateReport = () => {
    console.log('Generating report with criteria:', criteria);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-6">Report Configuration</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter report name"
              value={criteria.name}
              onChange={(e) => setCriteria({ ...criteria, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Type
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={criteria.type}
              onChange={(e) => setCriteria({ ...criteria, type: e.target.value as any })}
            >
              {reportTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={criteria.dateRange}
              onChange={(e) => setCriteria({ ...criteria, dateRange: e.target.value as any })}
            >
              {dateRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Departments
            </label>
            <div className="space-y-2">
              {departments.map((dept) => (
                <label key={dept} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={criteria.departments.includes(dept)}
                    onChange={(e) => {
                      const newDepts = e.target.checked
                        ? [...criteria.departments, dept]
                        : criteria.departments.filter(d => d !== dept);
                      setCriteria({ ...criteria, departments: newDepts });
                    }}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>{dept}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">Selected Metrics</h3>
            <p className="text-sm text-gray-500">Choose the metrics to include in your report</p>
          </div>
          <Button variant="secondary">
            <Plus className="h-4 w-4 mr-2" />
            Add Metric
          </Button>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="secondary">
          <Filter className="h-4 w-4 mr-2" />
          Preview
        </Button>
        <Button onClick={handleGenerateReport}>
          <Download className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>
    </div>
  );
}