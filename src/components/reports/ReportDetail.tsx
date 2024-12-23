import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/Button';

interface ReportDetailProps {
  title: string;
  onBack: () => void;
  children: React.ReactNode;
}

export function ReportDetail({ title, onBack, children }: ReportDetailProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="secondary" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      </div>
      {children}
    </div>
  );
}