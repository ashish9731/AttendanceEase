import React from 'react';
import { Navigation } from '../components/dashboard/Navigation';
import { ProfileSettings } from '../components/settings/ProfileSettings';
import { NotificationSettings } from '../components/settings/NotificationSettings';
import { SecuritySettings } from '../components/settings/SecuritySettings';
import { PreferenceSettings } from '../components/settings/PreferenceSettings';

export function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
        <div className="space-y-6">
          <ProfileSettings />
          <NotificationSettings />
          <SecuritySettings />
          <PreferenceSettings />
        </div>
      </main>
    </div>
  );
}