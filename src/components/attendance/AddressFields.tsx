import React from 'react';
import { MapPin } from 'lucide-react';
import { Input } from '../ui/Input';

interface AddressFieldsProps {
  presentAddress: string;
  permanentAddress: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function AddressFields({ presentAddress, permanentAddress, onChange }: AddressFieldsProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Present Address</label>
        <Input
          icon={MapPin}
          type="text"
          name="presentAddress"
          placeholder="Present Address"
          value={presentAddress}
          onChange={onChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Permanent Address</label>
        <Input
          icon={MapPin}
          type="text"
          name="permanentAddress"
          placeholder="Permanent Address"
          value={permanentAddress}
          onChange={onChange}
          required
        />
      </div>
    </div>
  );
}