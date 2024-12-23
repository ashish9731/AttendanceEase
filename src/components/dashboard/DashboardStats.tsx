import React from 'react';
import { Users, Clock, Calendar, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEmployeeStore } from '../../stores/useEmployeeStore';

export function DashboardStats() {
  const navigate = useNavigate();
  const { 
    employees,
    getPresentEmployees,
    getLateEmployees,
    getAbsentEmployees
  } = useEmployeeStore();
  
  const presentEmployees = getPresentEmployees();
  const lateEmployees = getLateEmployees();
  const absentEmployees = getAbsentEmployees();
  
  const stats = [
    {
      label: 'Present Today',
      value: presentEmployees.length,
      icon: Users,
      path: '/attendance',
      trend: '+2.5%',
      trendUp: true,
      color: 'bg-blue-50 text-blue-700',
      iconBg: 'bg-blue-100'
    },
    {
      label: 'Late Today',
      value: lateEmployees.length,
      icon: Clock,
      path: '/late-checkins',
      trend: '-1.2%',
      trendUp: false,
      color: 'bg-yellow-50 text-yellow-700',
      iconBg: 'bg-yellow-100'
    },
    {
      label: 'On Leave',
      value: absentEmployees.length,
      icon: Calendar,
      path: '/leave',
      trend: '+0.8%',
      trendUp: true,
      color: 'bg-red-50 text-red-700',
      iconBg: 'bg-red-100'
    },
    {
      label: 'Total Employees',
      value: employees.length,
      icon: TrendingUp,
      path: '/employee-changes',
      trend: '+3.2%',
      trendUp: true,
      color: 'bg-green-50 text-green-700',
      iconBg: 'bg-green-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          onClick={() => navigate(stat.path)}
          className="transform transition-all duration-200 hover:scale-105 cursor-pointer"
        >
          <div className={`rounded-xl shadow-sm overflow-hidden ${stat.color}`}>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className={`rounded-lg ${stat.iconBg} p-3`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className={`h-4 w-4 ${stat.trendUp ? 'text-green-500' : 'text-red-500'}`} />
                  <span className={`text-sm ${stat.trendUp ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.trend}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">{stat.label}</h3>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
              </div>
            </div>
            <div className="bg-white/10 px-6 py-3">
              <div className="text-sm font-medium">
                Click to view details →
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}