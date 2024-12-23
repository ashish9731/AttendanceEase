import React from 'react';

export function ActivityFeed() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
      <div className="space-y-4">
        <p className="text-gray-500">No recent activity</p>
      </div>
    </div>
  );
}