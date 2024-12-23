import React from 'react';
import { Users, Clock, AlertCircle, TrendingUp } from 'lucide-react';
import { useEmployeeStore } from '../../stores/useEmployeeStore';
import { Tooltip } from '../ui/Tooltip';

const metrics = [
  { key: 'attendanceRate', label: 'Attendance' },
  { key: 'productivity', label: 'Productivity' },
  { key: 'engagement', label: 'Engagement' },
  { key: 'satisfaction', label: 'Satisfaction' }
];

function getHeatmapColor(value: number): string {
  if (value >= 90) return 'bg-green-100 text-green-800';
  if (value >= 75) return 'bg-blue-100 text-blue-800';
  if (value >= 60) return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
}

function getAttentionReasons(dept: {
  name: string;
  attendanceRate: number;
  productivity: number;
  engagement: number;
  satisfaction: number;
}): string[] {
  const reasons = [];
  
  if (dept.attendanceRate < 80) {
    reasons.push(`Low attendance rate (${dept.attendanceRate}%)`);
  }
  if (dept.productivity < 75) {
    reasons.push(`Below target productivity (${dept.productivity}%)`);
  }
  if (dept.engagement < 70) {
    reasons.push(`Low team engagement (${dept.engagement}%)`);
  }
  if (dept.satisfaction < 65) {
    reasons.push(`Low satisfaction score (${dept.satisfaction}%)`);
  }
  
  return reasons;
}

export function DepartmentOverview() {
  const { employees } = useEmployeeStore();

  // Group employees by department and calculate stats
  const departmentStats = React.useMemo(() => {
    const departments = [...new Set(employees.map(emp => emp.department))];
    
    return departments.map(deptName => {
      const deptEmployees = employees.filter(emp => emp.department === deptName);
      const presentEmployees = deptEmployees.filter(emp => emp.status === 'Present' || emp.status === 'Early');
      
      return {
        name: deptName,
        employeeCount: deptEmployees.length,
        attendanceRate: Math.round((presentEmployees.length / deptEmployees.length) * 100),
        productivity: Math.round(75 + Math.random() * 20), // Simulated data
        engagement: Math.round(70 + Math.random() * 25),   // Simulated data
        satisfaction: Math.round(65 + Math.random() * 30)  // Simulated data
      };
    });
  }, [employees]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Department Overview</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span className="w-3 h-3 rounded-full bg-green-100"></span>
          <span>90%+</span>
          <span className="w-3 h-3 rounded-full bg-blue-100"></span>
          <span>75-89%</span>
          <span className="w-3 h-3 rounded-full bg-yellow-100"></span>
          <span>60-74%</span>
          <span className="w-3 h-3 rounded-full bg-red-100"></span>
          <span>&lt;60%</span>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Team Size
              </th>
              {metrics.map(metric => (
                <th key={metric.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {metric.label}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {departmentStats.map((dept) => {
              const attentionReasons = getAttentionReasons(dept);
              const needsAttention = attentionReasons.length > 0;
              
              return (
                <tr key={dept.name} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{dept.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{dept.employeeCount}</span>
                    </div>
                  </td>
                  
                  {metrics.map(metric => (
                    <td key={metric.key} className="px-6 py-4 whitespace-nowrap">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium text-center ${
                        getHeatmapColor(dept[metric.key])
                      }`}>
                        {dept[metric.key]}%
                      </div>
                    </td>
                  ))}
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {needsAttention ? (
                        <Tooltip content={
                          <div className="space-y-1">
                            <p className="font-medium mb-1">Attention Required:</p>
                            <ul className="list-disc list-inside">
                              {attentionReasons.map((reason, index) => (
                                <li key={index}>{reason}</li>
                              ))}
                            </ul>
                          </div>
                        }>
                          <div className="flex items-center text-amber-600 cursor-help">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            <span className="text-sm">Needs Attention</span>
                          </div>
                        </Tooltip>
                      ) : (
                        <div className="flex items-center text-green-600">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          <span className="text-sm">Good Standing</span>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}