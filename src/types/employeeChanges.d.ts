interface EmployeeChange {
  id: string;
  type: 'hire' | 'resignation';
  date: string;
  employee: {
    id: string;
    name: string;
    position: string;
    department: string;
    avatar: string;
  };
}

interface EmployeeChangeStats {
  hires: number;
  hiresChange: number;
  resignations: number;
  resignationsChange: number;
  growthRate: number;
  growthRateChange: number;
  netChange: number;
  netChangePercent: number;
}