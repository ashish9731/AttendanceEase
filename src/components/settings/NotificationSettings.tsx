import React from 'react';
import { Bell, Mail, Smartphone } from 'lucide-react';

const notificationTypes = [
  {
    id: 'email',
    label: 'Email Notifications',
    icon: Mail,
    options: [
      { id: 'attendance', label: 'Attendance Updates' },
      { id: 'leave', label: 'Leave Status' },
      { id: 'reports', label: 'Report Generation' }
    ]
  },
  {
    id: 'push',
    label: 'Push Notifications',
    icon: Bell,
    options: [
      { id: 'checkin', label: 'Check-in Reminders' },
      { id: 'checkout', label: 'Check-out Reminders' },
      { id: 'announcements', label: 'Important Announcements' }
    ]
  }
];

export function NotificationSettings() {
  const [preferences, setPreferences] = React.useState({
    email: ['attendance', 'leave'],
    push: ['checkin', 'checkout']
  });

  const handleToggle = (type: 'email' | 'push', optionId: string) => {
    setPreferences(prev => ({
      ...prev,
      [type]: prev[type].includes(optionId)
        ? prev[type].filter(id => id !== optionId)
        : [...prev[type], optionId]
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-6">Notification Preferences</h2>
      <div className="space-y-6">
        {notificationTypes.map(type => (
          <div key={type.id} className="space-y-4">
            <div className="flex items-center space-x-2">
              <type.icon className="h-5 w-5 text-gray-500" />
              <h3 className="font-medium">{type.label}</h3>
            </div>
            <div className="ml-7 space-y-3">
              {type.options.map(option => (
                <label key={option.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={preferences[type.id].includes(option.id)}
                    onChange={() => handleToggle(type.id as 'email' | 'push', option.id)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}