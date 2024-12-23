import React from 'react';
import { Lock, Shield, Smartphone } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export function SecuritySettings() {
  const [showPasswordForm, setShowPasswordForm] = React.useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-6">Security Settings</h2>
      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Lock className="h-5 w-5 text-gray-500" />
            <div>
              <div className="font-medium">Password</div>
              <div className="text-sm text-gray-500">Last changed 30 days ago</div>
            </div>
          </div>
          <Button variant="secondary" onClick={() => setShowPasswordForm(!showPasswordForm)}>
            Change Password
          </Button>
        </div>

        {showPasswordForm && (
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <Input
              icon={Lock}
              type="password"
              name="currentPassword"
              placeholder="Current Password"
            />
            <Input
              icon={Lock}
              type="password"
              name="newPassword"
              placeholder="New Password"
            />
            <Input
              icon={Lock}
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
            />
            <div className="flex justify-end space-x-4">
              <Button variant="secondary" onClick={() => setShowPasswordForm(false)}>
                Cancel
              </Button>
              <Button>Update Password</Button>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Smartphone className="h-5 w-5 text-gray-500" />
            <div>
              <div className="font-medium">Two-Factor Authentication</div>
              <div className="text-sm text-gray-500">Add an extra layer of security</div>
            </div>
          </div>
          <Button variant="secondary">Enable</Button>
        </div>
      </div>
    </div>
  );
}