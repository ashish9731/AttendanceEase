// Utility functions for date and time formatting
export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

export const calculateHoursWorked = (checkIn: Date, checkOut: Date): string => {
  const diff = checkOut.getTime() - checkIn.getTime();
  const hours = diff / (1000 * 60 * 60);
  return `${hours.toFixed(1)}h`;
};