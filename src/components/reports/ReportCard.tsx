import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ReportCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
}

export function ReportCard({ title, description, icon: Icon, onClick }: ReportCardProps) {
  return (
    <div 
      className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start space-x-4">
        <div className="p-3 bg-blue-50 rounded-lg">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
}