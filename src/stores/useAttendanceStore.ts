import { create } from 'zustand';
import { mockEmployees } from '../data/mockEmployees';

interface AttendanceState {
  employees: typeof mockEmployees;
  getTotalPresentCount: () => number;
  getEarlyLoginCount: () => number;
  getLateLoginCount: () => number;
  getOnLeaveCount: () => number;
  getTrends: () => {
    totalPresentTrend: string;
    earlyLoginTrend: string;
    leaveTrend: string;
    lateTrend: string;
  };
}

export const useAttendanceStore = create<AttendanceState>((set, get) => ({
  employees: mockEmployees,
  
  getTotalPresentCount: () => {
    const employees = get().employees;
    return employees.filter(emp => 
      emp.attendance.today.status === 'Present' || 
      emp.attendance.today.status === 'Early' || 
      emp.attendance.today.status === 'Late'
    ).length;
  },

  getEarlyLoginCount: () => {
    const employees = get().employees;
    return employees.filter(emp => emp.attendance.today.status === 'Early').length;
  },

  getLateLoginCount: () => {
    const employees = get().employees;
    return employees.filter(emp => emp.attendance.today.status === 'Late').length;
  },

  getOnLeaveCount: () => {
    const employees = get().employees;
    return employees.filter(emp => emp.attendance.today.status === 'Absent').length;
  },

  getTrends: () => ({
    totalPresentTrend: '+3.2%',
    earlyLoginTrend: '+2.5%',
    leaveTrend: '-1.2%',
    lateTrend: '-0.8%'
  })
}));