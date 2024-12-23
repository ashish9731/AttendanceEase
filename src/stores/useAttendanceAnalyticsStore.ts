import { create } from 'zustand';
import { useEmployeeStore } from './useEmployeeStore';

interface AttendanceAnalytics {
  getAttendanceTrends: (timeRange: 'daily' | 'weekly' | 'monthly') => {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
    }[];
  };
  getDepartmentAnalytics: () => {
    labels: string[];
    present: number[];
    late: number[];
    absent: number[];
  };
  getProductivityMetrics: () => {
    averageHours: string;
    onTimeRate: string;
    utilizationRate: string;
  };
}

export const useAttendanceAnalyticsStore = create<AttendanceAnalytics>((set, get) => {
  const { employees } = useEmployeeStore.getState();

  return {
    getAttendanceTrends: (timeRange) => {
      // Generate consistent data based on actual employee counts
      const totalEmployees = employees.length;
      const presentCount = employees.filter(e => e.status === 'Present' || e.status === 'Early').length;
      const lateCount = employees.filter(e => e.status === 'Late').length;
      
      switch (timeRange) {
        case 'daily':
          return {
            labels: ['6AM', '8AM', '10AM', '12PM', '2PM', '4PM', '6PM', '8PM'],
            datasets: [{
              label: 'Check-ins',
              data: [
                Math.floor(presentCount * 0.1),
                Math.floor(presentCount * 0.3),
                Math.floor(presentCount * 0.4),
                Math.floor(lateCount * 0.8),
                Math.floor(lateCount * 0.2),
                0,
                0,
                0
              ]
            }]
          };

        case 'weekly':
          return {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            datasets: [
              {
                label: 'Present',
                data: Array(5).fill(0).map(() => 
                  Math.floor(totalEmployees * (0.8 + Math.random() * 0.15))
                )
              },
              {
                label: 'Late',
                data: Array(5).fill(0).map(() => 
                  Math.floor(totalEmployees * (0.05 + Math.random() * 0.1))
                )
              }
            ]
          };

        case 'monthly':
          return {
            labels: Array.from({ length: 30 }, (_, i) => (i + 1).toString()),
            datasets: [{
              label: 'Attendance Rate',
              data: Array(30).fill(0).map(() => 
                Math.floor(85 + Math.random() * 10)
              )
            }]
          };
      }
    },

    getDepartmentAnalytics: () => {
      const departments = [...new Set(employees.map(e => e.department))];
      const present = departments.map(dept => 
        employees.filter(e => e.department === dept && (e.status === 'Present' || e.status === 'Early')).length
      );
      const late = departments.map(dept =>
        employees.filter(e => e.department === dept && e.status === 'Late').length
      );
      const absent = departments.map(dept =>
        employees.filter(e => e.department === dept && e.status === 'Absent').length
      );

      return { labels: departments, present, late, absent };
    },

    getProductivityMetrics: () => {
      const avgHours = employees.reduce((acc, emp) => {
        const hours = parseFloat(emp.attendance.today.hoursWorked);
        return acc + (isNaN(hours) ? 0 : hours);
      }, 0) / employees.length;

      const onTimeCount = employees.filter(e => e.status === 'Present' || e.status === 'Early').length;
      const onTimeRate = (onTimeCount / employees.length) * 100;

      const activeHours = employees.reduce((acc, emp) => {
        const hours = parseFloat(emp.attendance.today.hoursWorked);
        return acc + (isNaN(hours) ? 0 : hours);
      }, 0);
      const utilizationRate = (activeHours / (employees.length * 8)) * 100;

      return {
        averageHours: `${avgHours.toFixed(1)}h`,
        onTimeRate: `${onTimeRate.toFixed(1)}%`,
        utilizationRate: `${utilizationRate.toFixed(1)}%`
      };
    }
  };
});