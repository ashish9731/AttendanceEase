import React, { useState } from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';
import { useAttendanceAnalyticsStore } from '../../stores/useAttendanceAnalyticsStore';
import { Button } from '../ui/Button';
import { LineChart } from './charts/LineChart';
import { BarChart } from './charts/BarChart';
import { AttendanceMetrics } from './AttendanceMetrics';

type TimeRange = 'daily' | 'weekly' | 'monthly';

export function AttendanceGraphs() {
  const [timeRange, setTimeRange] = useState<TimeRange>('daily');
  const { getAttendanceTrends, getDepartmentAnalytics } = useAttendanceAnalyticsStore();
  
  const trends = getAttendanceTrends(timeRange);
  const departmentStats = getDepartmentAnalytics();

  return (
    <div className="space-y-6">
      <AttendanceMetrics />
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Attendance Trends</h2>
          <div className="flex items-center space-x-2">
            {(['daily', 'weekly', 'monthly'] as TimeRange[]).map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? 'primary' : 'secondary'}
                onClick={() => setTimeRange(range)}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <h3 className="font-medium">Check-in Distribution</h3>
            </div>
            <div className="h-80">
              <BarChart data={trends} />
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <h3 className="font-medium">Department Breakdown</h3>
            </div>
            <div className="h-80">
              <BarChart
                data={{
                  labels: departmentStats.labels,
                  datasets: [
                    {
                      label: 'Present',
                      data: departmentStats.present
                    },
                    {
                      label: 'Late',
                      data: departmentStats.late
                    },
                    {
                      label: 'Absent',
                      data: departmentStats.absent
                    }
                  ]
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}