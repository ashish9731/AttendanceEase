import React from 'react';
import { User, Mail, Phone, Building } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export function ProfileSettings() {
  const [profile, setProfile] = React.useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    department: 'Engineering',
    designation: 'Senior Developer',
    employeeId: 'EMP001'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-6">Profile Information</h2>
      <div className="space-y-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="h-10 w-10 text-gray-400" />
          </div>
          <Button variant="secondary">Change Photo</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            icon={User}
            type="text"
            name="name"
            placeholder="Full Name"
            value={profile.name}
            onChange={handleChange}
          />
          <Input
            icon={Mail}
            type="email"
            name="email"
            placeholder="Email Address"
            value={profile.email}
            onChange={handleChange}
          />
          <Input
            icon={Phone}
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={profile.phone}
            onChange={handleChange}
          />
          <Input
            icon={Building}
            type="text"
            name="department"
            placeholder="Department"
            value={profile.department}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end">
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}