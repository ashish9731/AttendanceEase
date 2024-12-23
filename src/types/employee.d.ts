interface Employee {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  department: string;
  position: string;
  avatar: string;
  status: 'Present' | 'Late' | 'Early' | 'Absent';
  attendance: {
    today: {
      checkIn: string;
      checkOut: string;
      status: string;
      hoursWorked: string;
    };
    weekly: {
      date: string;
      checkIn: string;
      checkOut: string;
      status: string;
      hoursWorked: string;
    }[];
    monthly: {
      presentDays: number;
      lateDays: number;
      absentDays: number;
      avgHoursPerDay: string;
    };
  };
  leave: {
    balance: {
      annual: number;
      sick: number;
      personal: number;
    };
    history: {
      type: string;
      startDate: string;
      endDate: string;
      status: string;
      reason: string;
    }[];
  };
}