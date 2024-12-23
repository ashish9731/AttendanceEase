import { faker } from '@faker-js/faker';
import { formatTime, formatDate, calculateHoursWorked } from '../utils/dateUtils';

const leaveTypes = ['Sick Leave', 'Casual Leave', 'Paid Leave', 'Personal Leave'];
const leaveReasons = [
  'Medical appointment',
  'Family emergency',
  'Personal matters',
  'Vacation',
  'Health issues'
];

// Generate consistent check-in/out times for today
const generateTodayTimes = () => {
  const now = new Date();
  const checkIn = new Date(now.setHours(faker.number.int({ min: 5, max: 10 }), faker.number.int({ min: 0, max: 59 })));
  const checkOut = new Date(now.setHours(faker.number.int({ min: 16, max: 20 }), faker.number.int({ min: 0, max: 59 })));
  return { checkIn, checkOut };
};

// Generate weekly attendance records
const generateWeeklyAttendance = () => {
  const today = new Date();
  return Array.from({ length: 5 }, (_, index) => {
    const date = new Date(today);
    date.setDate(date.getDate() - index);
    const checkIn = new Date(date.setHours(faker.number.int({ min: 5, max: 10 }), faker.number.int({ min: 0, max: 59 })));
    const checkOut = new Date(date.setHours(faker.number.int({ min: 16, max: 20 }), faker.number.int({ min: 0, max: 59 })));
    
    return {
      date: formatDate(date),
      checkIn: formatTime(checkIn),
      checkOut: formatTime(checkOut),
      status: faker.helpers.arrayElement(['Present', 'Early']),
      hoursWorked: calculateHoursWorked(checkIn, checkOut)
    };
  });
};

// Generate 50 fake employees
export const mockEmployees = Array.from({ length: 50 }, (_, index) => {
  const { checkIn: todayCheckIn, checkOut: todayCheckOut } = generateTodayTimes();
  
  return {
    id: `EMP${String(index + 1).padStart(3, '0')}`,
    name: faker.person.fullName(),
    department: faker.helpers.arrayElement(['Engineering', 'Design', 'Marketing', 'HR', 'Finance', 'Sales']),
    checkIn: formatTime(todayCheckIn),
    status: faker.helpers.arrayElement(['On Time', 'Late', 'Early']),
    avatar: faker.image.avatar(),
    email: faker.internet.email(),
    position: faker.person.jobTitle(),
    attendance: {
      today: {
        checkIn: formatTime(todayCheckIn),
        checkOut: formatTime(todayCheckOut),
        status: faker.helpers.arrayElement(['Present', 'Late', 'Early', 'Absent']),
        hoursWorked: calculateHoursWorked(todayCheckIn, todayCheckOut)
      },
      weekly: generateWeeklyAttendance(),
      monthly: {
        totalDays: 22,
        presentDays: 20,
        lateDays: 2,
        absentDays: 1,
        avgHoursPerDay: '7.9h'
      }
    },
    leave: {
      type: faker.helpers.arrayElement(leaveTypes),
      duration: faker.number.int({ min: 1, max: 5 }),
      startDate: formatDate(new Date()),
      endDate: formatDate(new Date(Date.now() + 86400000 * 5)),
      reason: faker.helpers.arrayElement(leaveReasons),
      history: Array.from({ length: 3 }, () => ({
        date: formatDate(faker.date.recent()),
        type: faker.helpers.arrayElement(leaveTypes),
        status: faker.helpers.arrayElement(['Approved', 'Pending', 'Rejected'])
      }))
    }
  };
});