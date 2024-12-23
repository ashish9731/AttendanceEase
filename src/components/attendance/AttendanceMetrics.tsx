import React from 'react';
import { Clock, TrendingUp, Users } from 'lucide-react';
import { useAttendanceAnalyticsStore } from '../../stores/useAttendanceAnalyticsStore';

export function AttendanceMetrics() {
  const { getProductivityMetrics } = useAttendanceAnalyticsStore();
  const metrics = getProductivityMetrics();

  const cards = [
    {
      title: 'Average Hours',
      value: metrics.averageHours,
      icon: Clock,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'On-Time Rate',
      value: metrics.onTimeRate,
      icon: TrendingUp,
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Utilization Rate',
      value: metrics.utilizationRate,
      icon: Users,
      color: 'bg-purple-50 text-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card) => (
        <div key={card.title} className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${card.color}`}>
              <card.icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">{card.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}