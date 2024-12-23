import React from 'react';
import { Users, UserPlus, UserMinus, Award } from 'lucide-react';
import { useEmployeeStore } from '../../stores/useEmployeeStore';
import { useNavigate } from 'react-router-dom';

export function EmployeeOverview() {
  const { employees, getEmployeeChangeStats } = useEmployeeStore();
  const navigate = useNavigate();
  const monthlyStats = getEmployeeChangeStats('month');

  const stats = [
    {
      label: 'Total Employees',
      value: employees.length,
      icon: Users,
      color: 'bg-blue-50 text-blue-600',
      onClick: () => navigate('/attendance')
    },
    {
      label: 'New Hires',
      value: monthlyStats.hires,
      icon: UserPlus,
      color: 'bg-green-50 text-green-600',
      onClick: () => navigate('/employee-changes')
    },
    {
      label: 'Resignations',
      value: monthlyStats.resignations,
      icon: UserMinus,
      color: 'bg-red-50 text-red-600',
      onClick: () => navigate('/employee-changes')
    },
    {
      label: 'Top Performers',
      value: Math.round(employees.length * 0.2), // Top 20% as example
      icon: Award,
      color: 'bg-purple-50 text-purple-600',
      onClick: () => navigate('/reports')
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Employee Overview</h2>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="p-4 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={stat.onClick}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-gray-500">{stat.label}</div>
                <div className="text-xl font-semibold">{stat.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}