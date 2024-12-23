import React from 'react';
import { UserPlus, UserMinus, TrendingUp, TrendingDown } from 'lucide-react';
import { useEmployeeStore } from '../../stores/useEmployeeStore';
import { Button } from '../ui/Button';

interface EmployeeChangesStatsProps {
  timeRange: 'week' | 'month' | 'quarter';
  onTimeRangeChange: (range: 'week' | 'month' | 'quarter') => void;
}

export function EmployeeChangesStats({ timeRange, onTimeRangeChange }: EmployeeChangesStatsProps) {
  const { getEmployeeChangeStats } = useEmployeeStore();
  const stats = getEmployeeChangeStats(timeRange);

  return (
    <div className="space-y-6">
      <div className="flex justify-end space-x-2">
        {(['week', 'month', 'quarter'] as const).map((range) => (
          <Button
            key={range}
            variant={timeRange === range ? 'primary' : 'secondary'}
            onClick={() => onTimeRangeChange(range)}
          >
            {range.charAt(0).toUpperCase() + range.slice(1)}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-green-50 rounded-lg">
              <UserPlus className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">New Hires</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.hires}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">{stats.hiresChange}%</span>
            <span className="text-gray-500 ml-2">vs previous {timeRange}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-red-50 rounded-lg">
              <UserMinus className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Resignations</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.resignations}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
            <span className="text-red-500 font-medium">{stats.resignationsChange}%</span>
            <span className="text-gray-500 ml-2">vs previous {timeRange}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-blue-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Growth Rate</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.growthRate}%</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className={`${stats.growthRate >= 0 ? 'text-green-500' : 'text-red-500'} font-medium`}>
              {stats.growthRate >= 0 ? '+' : ''}{stats.growthRateChange}%
            </span>
            <span className="text-gray-500 ml-2">vs previous {timeRange}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-purple-50 rounded-lg">
              <UserPlus className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Net Change</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.netChange}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className={`${stats.netChange >= 0 ? 'text-green-500' : 'text-red-500'} font-medium`}>
              {stats.netChange >= 0 ? '+' : ''}{stats.netChangePercent}%
            </span>
            <span className="text-gray-500 ml-2">total workforce</span>
          </div>
        </div>
      </div>
    </div>
  );
}