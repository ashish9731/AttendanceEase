import React from 'react';
import { Mail, User, MapPin, Calendar } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { AddressFields } from './AddressFields';

export function EmployeeForm() {
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    personalEmail: '',
    workEmail: '',
    presentAddress: '',
    permanentAddress: '',
    dateOfBirth: '',
    dateOfJoining: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Employee data:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Profile Management</h1>
      <h2 className="text-xl font-semibold text-gray-700 mb-6">Employee Information</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            icon={User}
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <Input
            icon={User}
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            icon={Mail}
            type="email"
            name="personalEmail"
            placeholder="Personal Email"
            value={formData.personalEmail}
            onChange={handleChange}
            required
          />
          <Input
            icon={Mail}
            type="email"
            name="workEmail"
            placeholder="Work Email"
            value={formData.workEmail}
            onChange={handleChange}
            required
          />
        </div>

        <AddressFields
          presentAddress={formData.presentAddress}
          permanentAddress={formData.permanentAddress}
          onChange={handleChange}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            icon={Calendar}
            type="date"
            name="dateOfBirth"
            placeholder="Date of Birth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
          <Input
            icon={Calendar}
            type="date"
            name="dateOfJoining"
            placeholder="Date of Joining"
            value={formData.dateOfJoining}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit">Save Employee</Button>
        </div>
      </form>
    </div>
  );
}