import React from 'react';
import { Calendar } from 'lucide-react';

export function DateFilter() {
  return (
    <div className="flex items-center space-x-4">
      <div className="relative">
        <input
          type="date"
          className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
}