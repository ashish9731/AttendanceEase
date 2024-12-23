import { useState, useMemo } from 'react';

export function useMonthCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const days = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysArray: Date[] = [];

    // Add previous month's days
    for (let i = 0; i < firstDay.getDay(); i++) {
      const date = new Date(currentYear, currentMonth, -i);
      daysArray.unshift(date);
    }

    // Add current month's days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      daysArray.push(new Date(currentYear, currentMonth, i));
    }

    // Add next month's days to complete the grid
    const remainingDays = 42 - daysArray.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      daysArray.push(new Date(currentYear, currentMonth + 1, i));
    }

    return daysArray;
  }, [currentMonth, currentYear]);

  const previousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1));
  };

  return {
    currentMonth,
    currentYear,
    days,
    previousMonth,
    nextMonth
  };
}