import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const res = await axios.get('http://localhost:3000/alerts', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setAlerts(res.data);
    } catch (err) {
      console.error("Failed to fetch alerts", err);
    }
  };

  const resolveAlert = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/alerts/${id}/resolve`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchAlerts(); // Refresh list
    } catch (err) {
      alert("Error resolving alert");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="bg-aldhow-blue p-4">
        <h3 className="text-white font-bold text-lg">System Alerts: Missing Crates</h3>
      </div>
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-4 text-sm font-semibold text-gray-600">Date</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Driver ID</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Missing Qty</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Crate IDs</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Status</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Action</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((alert) => (
            <tr key={alert.alert_id} className="border-b hover:bg-aldhow-light">
              <td className="p-4 text-sm">{new Date(alert.date).toLocaleDateString()}</td>
              <td className="p-4 text-sm font-mono">{alert.driver_id.slice(0,8)}...</td>
              <td className="p-4 text-sm font-bold text-red-600">{alert.missing_count}</td>
              <td className="p-4 text-xs text-gray-500 max-w-xs truncate">{alert.missing_crate_ids}</td>
              <td className="p-4">
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  alert.status === 'OPEN' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                }`}>
                  {alert.status}
                </span>
              </td>
              <td className="p-4">
                {alert.status === 'OPEN' && (
                  <button 
                    onClick={() => resolveAlert(alert.alert_id)}
                    className="text-aldhow-blue hover:underline text-sm font-semibold"
                  >
                    Mark Resolved
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Alerts;