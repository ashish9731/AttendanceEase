import React from 'react';
import { Users, Clock, Calendar, Briefcase, UserCheck, PieChart } from 'lucide-react';
import { ReportCard } from './ReportCard';

const reportTypes = [
  {
    title: 'Daily Attendance Report',
    description: 'View detailed attendance records for each day including check-in/out times',
    icon: Clock,
    type: 'daily'
  },
  {
    title: 'Monthly Summary',
    description: 'Monthly overview of attendance, leaves, and working hours',
    icon: Calendar,
    type: 'monthly'
  },
  {
    title: 'Department Analytics',
    description: 'Attendance patterns and statistics by department',
    icon: Briefcase,
    type: 'department'
  },
  {
    title: 'Employee Performance',
    description: 'Individual employee attendance and punctuality metrics',
    icon: Users,
    type: 'employee'
  },
  {
    title: 'Leave Analysis',
    description: 'Detailed analysis of leave patterns and trends',
    icon: UserCheck,
    type: 'leave'
  },
  {
    title: 'Custom Reports',
    description: 'Generate customized reports based on specific criteria',
    icon: PieChart,
    type: 'custom'
  }
];

interface ReportTypesProps {
  onReportClick: (type: string, title: string) => void;
}

export function ReportTypes({ onReportClick }: ReportTypesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reportTypes.map((report) => (
        <ReportCard
          key={report.title}
          {...report}
          onClick={() => onReportClick(report.type, report.title)}
        />
      ))}
    </div>
  );
}