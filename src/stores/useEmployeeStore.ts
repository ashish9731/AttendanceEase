import { create } from 'zustand';
import { faker } from '@faker-js/faker';
import { formatTime, formatDate } from '../utils/dateUtils';

// Generate consistent employee data
const generateEmployees = (count: number = 50): Employee[] => {
  return Array.from({ length: count }, (_, index) => {
    const checkIn = new Date();
    checkIn.setHours(faker.number.int({ min: 7, max: 10 }), faker.number.int({ min: 0, max: 59 }));
    
    const checkOut = new Date(checkIn);
    checkOut.setHours(checkIn.getHours() + 8 + faker.number.int({ min: 0, max: 2 }));

    const status = faker.helpers.arrayElement(['Present', 'Late', 'Early', 'Absent'] as const);

    return {
      id: faker.string.uuid(),
      employeeId: `EMP${String(index + 1).padStart(3, '0')}`,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      department: faker.helpers.arrayElement(['Engineering', 'Design', 'Marketing', 'Sales', 'HR']),
      position: faker.person.jobTitle(),
      avatar: faker.image.avatar(),
      status,
      attendance: {
        today: {
          checkIn: formatTime(checkIn),
          checkOut: formatTime(checkOut),
          status,
          hoursWorked: `${checkOut.getHours() - checkIn.getHours()}h`
        },
        weekly: Array.from({ length: 5 }, () => {
          const date = faker.date.recent({ days: 7 });
          const dayCheckIn = new Date(date);
          dayCheckIn.setHours(faker.number.int({ min: 7, max: 10 }));
          const dayCheckOut = new Date(dayCheckIn);
          dayCheckOut.setHours(dayCheckIn.getHours() + 8);
          
          return {
            date: formatDate(date),
            checkIn: formatTime(dayCheckIn),
            checkOut: formatTime(dayCheckOut),
            status: faker.helpers.arrayElement(['Present', 'Late', 'Early', 'Absent']),
            hoursWorked: '8h'
          };
        }),
        monthly: {
          presentDays: faker.number.int({ min: 15, max: 22 }),
          lateDays: faker.number.int({ min: 0, max: 5 }),
          absentDays: faker.number.int({ min: 0, max: 3 }),
          avgHoursPerDay: `${faker.number.int({ min: 7, max: 9 })}.${faker.number.int({ min: 0, max: 9 })}h`
        }
      },
      leave: {
        balance: {
          annual: faker.number.int({ min: 5, max: 15 }),
          sick: faker.number.int({ min: 3, max: 10 }),
          personal: faker.number.int({ min: 1, max: 5 })
        },
        history: Array.from({ length: 3 }, () => ({
          type: faker.helpers.arrayElement(['Annual Leave', 'Sick Leave', 'Personal Leave']),
          startDate: formatDate(faker.date.recent({ days: 30 })),
          endDate: formatDate(faker.date.recent({ days: 30 })),
          status: faker.helpers.arrayElement(['Approved', 'Pending', 'Rejected']),
          reason: faker.lorem.sentence()
        }))
      }
    };
  });
};

interface EmployeeStore {
  employees: Employee[];
  getEmployeesByDepartment: (department: string) => Employee[];
  getPresentEmployees: () => Employee[];
  getAbsentEmployees: () => Employee[];
  getLateEmployees: () => Employee[];
  getEmployeesByDate: (date: Date) => Employee[];
  getDepartmentStats: (department: string) => {
    totalEmployees: number;
    presentCount: number;
    lateCount: number;
    absentCount: number;
    avgHoursWorked: string;
  };
  getEmployeeChanges: (timeRange: 'week' | 'month' | 'quarter') => EmployeeChange[];
  getEmployeeChangeStats: (timeRange: 'week' | 'month' | 'quarter') => EmployeeChangeStats;
}

export const useEmployeeStore = create<EmployeeStore>((set, get) => ({
  employees: generateEmployees(),

  getEmployeesByDepartment: (department) => {
    return get().employees.filter(emp => emp.department === department);
  },

  getPresentEmployees: () => {
    return get().employees.filter(emp => emp.status === 'Present' || emp.status === 'Early');
  },

  getAbsentEmployees: () => {
    return get().employees.filter(emp => emp.status === 'Absent');
  },

  getLateEmployees: () => {
    return get().employees.filter(emp => emp.status === 'Late');
  },

  getEmployeesByDate: (date: Date) => {
    // For demo purposes, we'll return a random subset of employees for each date
    const employees = get().employees;
    const seed = date.getDate() + date.getMonth() * 31;
    const randomCount = seed % 10 + 5; // Between 5 and 15 employees
    
    return faker.helpers.arrayElements(employees, randomCount).map(emp => ({
      ...emp,
      status: faker.helpers.arrayElement(['Present', 'Late', 'Early', 'Absent']),
      attendance: {
        ...emp.attendance,
        today: {
          ...emp.attendance.today,
          status: faker.helpers.arrayElement(['Present', 'Late', 'Early', 'Absent'])
        }
      }
    }));
  },

  getDepartmentStats: (department) => {
    const deptEmployees = get().getEmployeesByDepartment(department);
    const presentCount = deptEmployees.filter(emp => emp.status === 'Present' || emp.status === 'Early').length;
    const lateCount = deptEmployees.filter(emp => emp.status === 'Late').length;
    const absentCount = deptEmployees.filter(emp => emp.status === 'Absent').length;
    
    const avgHours = deptEmployees.reduce((acc, emp) => {
      const hours = parseFloat(emp.attendance.today.hoursWorked);
      return acc + (isNaN(hours) ? 0 : hours);
    }, 0) / deptEmployees.length;

    return {
      totalEmployees: deptEmployees.length,
      presentCount,
      lateCount,
      absentCount,
      avgHoursWorked: `${avgHours.toFixed(1)}h`
    };
  },

  getEmployeeChanges: (timeRange) => {
    const changes: EmployeeChange[] = [];
    const now = new Date();
    const daysToSubtract = timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : 90;
    
    // Generate some sample changes
    for (let i = 0; i < 10; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - faker.number.int({ min: 0, max: daysToSubtract }));
      
      changes.push({
        id: faker.string.uuid(),
        type: faker.helpers.arrayElement(['hire', 'resignation']),
        date: formatDate(date),
        employee: {
          id: faker.string.uuid(),
          name: faker.person.fullName(),
          position: faker.person.jobTitle(),
          department: faker.helpers.arrayElement(['Engineering', 'Design', 'Marketing', 'Sales', 'HR']),
          avatar: faker.image.avatar()
        }
      });
    }

    return changes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },

  getEmployeeChangeStats: (timeRange) => {
    const changes = get().getEmployeeChanges(timeRange);
    const hires = changes.filter(c => c.type === 'hire').length;
    const resignations = changes.filter(c => c.type === 'resignation').length;
    
    return {
      hires,
      hiresChange: 5.2,
      resignations,
      resignationsChange: -2.1,
      growthRate: Math.round((hires / (hires + resignations)) * 100) || 0,
      growthRateChange: 3.1,
      netChange: hires - resignations,
      netChangePercent: 2.5
    };
  }
}));