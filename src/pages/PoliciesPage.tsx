import React, { useState } from 'react';
import { Navigation } from '../components/dashboard/Navigation';
import { PolicyCard } from '../components/policies/PolicyCard';
import { PolicyModal } from '../components/policies/PolicyModal';
import { policies } from '../data/policies';

export function PoliciesPage() {
  const [selectedPolicy, setSelectedPolicy] = useState<string | null>(null);

  const handlePolicyClick = (policyId: string) => {
    setSelectedPolicy(policyId);
  };

  const selectedPolicyData = selectedPolicy 
    ? policies.find(p => p.id === selectedPolicy)
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Company Policies</h1>
          <p className="text-gray-500 mt-1">Review and understand company guidelines</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {policies.map((policy) => (
            <PolicyCard
              key={policy.id}
              title={policy.title}
              description={policy.description}
              icon={policy.icon}
              image={policy.image}
              onClick={() => handlePolicyClick(policy.id)}
            />
          ))}
        </div>

        {selectedPolicyData && (
          <PolicyModal
            policy={selectedPolicyData}
            onClose={() => setSelectedPolicy(null)}
          />
        )}
      </main>
    </div>
  );
}