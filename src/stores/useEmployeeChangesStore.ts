import { create } from 'zustand';
import { faker } from '@faker-js/faker';
import { formatDate } from '../utils/dateUtils';

// Generate mock employee changes data
const generateEmployeeChanges = (count: number = 20): EmployeeChange[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    type: faker.helpers.arrayElement(['hire', 'resignation'] as const),
    date: formatDate(faker.date.recent({ days: 90 })),
    employee: {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      position: faker.person.jobTitle(),
      department: faker.helpers.arrayElement(['Engineering', 'Design', 'Marketing', 'Sales', 'HR']),
      avatar: faker.image.avatar()
    }
  }));
};

interface EmployeeChangesStore {
  changes: EmployeeChange[];
  getEmployeeChanges: (timeRange: 'week' | 'month' | 'quarter') => EmployeeChange[];
  getEmployeeChangeStats: (timeRange: 'week' | 'month' | 'quarter') => EmployeeChangeStats;
}

export const useEmployeeChangesStore = create<EmployeeChangesStore>((set, get) => ({
  changes: generateEmployeeChanges(),

  getEmployeeChanges: (timeRange) => {
    const changes = get().changes;
    const now = new Date();
    const daysToSubtract = timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : 90;
    const cutoffDate = new Date(now.setDate(now.getDate() - daysToSubtract));

    return changes
      .filter(change => new Date(change.date) >= cutoffDate)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },

  getEmployeeChangeStats: (timeRange) => {
    const changes = get().getEmployeeChanges(timeRange);
    const hires = changes.filter(c => c.type === 'hire').length;
    const resignations = changes.filter(c => c.type === 'resignation').length;

    // Calculate previous period stats for comparison
    const previousChanges = get().changes.filter(change => {
      const changeDate = new Date(change.date);
      const now = new Date();
      const periodStart = new Date(now.setDate(now.getDate() - (timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : 90)));
      const previousPeriodStart = new Date(periodStart.setDate(periodStart.getDate() - (timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : 90)));
      return changeDate >= previousPeriodStart && changeDate < periodStart;
    });

    const previousHires = previousChanges.filter(c => c.type === 'hire').length;
    const previousResignations = previousChanges.filter(c => c.type === 'resignation').length;

    const hiresChange = previousHires === 0 ? 100 : ((hires - previousHires) / previousHires) * 100;
    const resignationsChange = previousResignations === 0 ? 0 : ((resignations - previousResignations) / previousResignations) * 100;

    const netChange = hires - resignations;
    const totalEmployees = 100; // This should ideally come from your employee store
    const netChangePercent = (netChange / totalEmployees) * 100;

    return {
      hires,
      hiresChange: Math.round(hiresChange * 10) / 10,
      resignations,
      resignationsChange: Math.round(resignationsChange * 10) / 10,
      growthRate: Math.round((hires / (hires + resignations)) * 100) || 0,
      growthRateChange: Math.round(hiresChange - resignationsChange),
      netChange,
      netChangePercent: Math.round(netChangePercent * 10) / 10
    };
  }
}));