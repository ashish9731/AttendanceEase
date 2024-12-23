import React from 'react';
import { LucideIcon } from 'lucide-react';

interface PolicyCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  onClick: () => void;
}

export function PolicyCard({ title, description, icon: Icon, image, onClick }: PolicyCardProps) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden"
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
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
    </div>
  );
}