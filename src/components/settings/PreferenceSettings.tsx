import React, { useState } from 'react';
import { Settings, Bell, Moon } from 'lucide-react';

export function PreferenceSettings() {
  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'en',
    timezone: 'UTC',
    notifications: {
      desktop: true,
      sound: true,
      attendance: true,
      leaves: true
    }
  });

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-6">Preferences</h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Theme
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={preferences.theme}
              onChange={(e) => setPreferences({ ...preferences, theme: e.target.value })}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={preferences.language}
              onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Timezone
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={preferences.timezone}
              onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
            >
              <option value="UTC">UTC</option>
              <option value="EST">EST</option>
              <option value="PST">PST</option>
            </select>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Notification Preferences</h3>
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={preferences.notifications.desktop}
                onChange={(e) => setPreferences({
                  ...preferences,
                  notifications: { ...preferences.notifications, desktop: e.target.checked }
                })}
                className="rounded text-blue-600 focus:ring-blue-500 mr-3"
              />
              <span>Enable desktop notifications</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={preferences.notifications.sound}
                onChange={(e) => setPreferences({
                  ...preferences,
                  notifications: { ...preferences.notifications, sound: e.target.checked }
                })}
                className="rounded text-blue-600 focus:ring-blue-500 mr-3"
              />
              <span>Enable notification sounds</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}