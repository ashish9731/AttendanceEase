import React from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

export function WeeklyAttendance() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-600" />
            <span className="text-sm font-medium">05-May-2024 - 11-May-2024</span>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>
        <div className="flex items-center">
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg flex items-center space-x-2">
            <span className="text-sm font-medium">Check-in</span>
            <span className="text-sm">00:02:00 Hrs</span>
          </div>
        </div>
      </div>
      
      <div className="text-sm text-gray-600 mb-4">
        Half day shift [ 9:00 AM - 1:00 PM ]
      </div>

      <div className="space-y-4">
        {[
          { day: 'Sun', date: '14', status: 'Weekend' },
          { day: 'Mon', date: '15', status: 'Present' },
          { day: 'Tue', date: '16', status: 'Present' },
          { day: 'Wed', date: '17', status: 'Absent' },
          { day: 'Thu', date: '18', status: 'Present' },
          { day: 'Fri', date: '18', status: 'Present' }
        ].map((item) => (
          <div key={item.day} className="flex items-center">
            <div className="w-24">
              <div className="font-medium">{item.day}</div>
              <div className="text-gray-500">{item.date}</div>
            </div>
            <div className="flex-1 px-4">
              <div className="relative h-2 bg-gray-100 rounded">
                <div 
                  className={`absolute inset-y-0 left-0 ${
                    item.status === 'Weekend' ? 'bg-yellow-400' :
                    item.status === 'Absent' ? 'bg-red-400' : 'bg-green-400'
                  } rounded w-1/2`}
                />
                {item.status !== 'Present' && (
                  <span className="absolute -top-7 left-1/2 transform -translate-x-1/2 text-xs px-2 py-1 rounded bg-gray-100">
                    {item.status}
                  </span>
                )}
              </div>
            </div>
            <div className="w-32 text-right">
              <div>12:00 PM</div>
            </div>
            <div className="w-32 text-right">
              <div>12:00 PM</div>
            </div>
            <div className="w-32 text-right">
              <div className="text-gray-500">00:00</div>
              <div className="text-xs text-gray-400">Hrs worked</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}