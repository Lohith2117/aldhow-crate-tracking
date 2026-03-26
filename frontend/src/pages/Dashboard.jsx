import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [stats, setStats] = useState({ out: 0, returned: 0, missing: 0 });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-aldhow-blue">
        <p className="text-sm text-gray-500 uppercase font-bold">Crates Out Today</p>
        <p className="text-3xl font-bold text-gray-800">{stats.out}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-400">
        <p className="text-sm text-gray-500 uppercase font-bold">Returned</p>
        <p className="text-3xl font-bold text-gray-800">{stats.returned}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500">
        <p className="text-sm text-gray-500 uppercase font-bold">Missing Alerts</p>
        <p className="text-3xl font-bold text-red-600">{stats.missing}</p>
      </div>
    </div>
  );
};

export default Dashboard;