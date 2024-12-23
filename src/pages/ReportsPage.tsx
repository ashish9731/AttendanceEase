import React, { useState } from 'react';
import { Navigation } from '../components/dashboard/Navigation';
import { DateFilter } from '../components/dashboard/DateFilter';
import { ReportFilters } from '../components/reports/ReportFilters';
import { ReportTypes } from '../components/reports/ReportTypes';
import { ReportDetail } from '../components/reports/ReportDetail';
import { DailyAttendanceReport } from '../components/reports/DailyAttendanceReport';
import { MonthlyReport } from '../components/reports/MonthlyReport';
import { DepartmentReport } from '../components/reports/DepartmentReport';
import { EmployeeReport } from '../components/reports/EmployeeReport';
import { LeaveReport } from '../components/reports/LeaveReport';
import { CustomReport } from '../components/reports/CustomReport';

type ReportType = 'list' | 'daily' | 'monthly' | 'department' | 'employee' | 'leave' | 'custom';

export function ReportsPage() {
  const [activeReport, setActiveReport] = useState<ReportType>('list');
  const [reportTitle, setReportTitle] = useState<string>('');

  const handleReportClick = (type: ReportType, title: string) => {
    setActiveReport(type);
    setReportTitle(title);
  };

  const renderReport = () => {
    switch (activeReport) {
      case 'daily':
        return <DailyAttendanceReport />;
      case 'monthly':
        return <MonthlyReport />;
      case 'department':
        return <DepartmentReport />;
      case 'employee':
        return <EmployeeReport />;
      case 'leave':
        return <LeaveReport />;
      case 'custom':
        return <CustomReport />;
      default:
        return (
          <>
            <ReportFilters />
            <ReportTypes onReportClick={handleReportClick} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-6">
        {activeReport === 'list' ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
              <DateFilter />
            </div>
            {renderReport()}
          </>
        ) : (
          <ReportDetail
            title={reportTitle}
            onBack={() => setActiveReport('list')}
          >
            {renderReport()}
          </ReportDetail>
        )}
      </main>
    </div>
  );
}