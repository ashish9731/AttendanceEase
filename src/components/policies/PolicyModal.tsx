import React from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Policy } from '../../types/policy';

interface PolicyModalProps {
  policy: Policy;
  onClose: () => void;
}

export function PolicyModal({ policy, onClose }: PolicyModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <policy.icon className="h-8 w-8 text-blue-600" />
              <h2 className="text-xl font-semibold">{policy.title}</h2>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {policy.sections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
              <div className="space-y-2">
                {section.content.map((item, i) => (
                  <p key={i} className="text-gray-600">{item}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 border-t bg-gray-50">
          <div className="flex justify-end">
            <Button variant="secondary" onClick={onClose}>Close</Button>
          </div>
        </div>
      </div>
    </div>
  );
}