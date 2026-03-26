import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExportButton from '../components/ExportButton';

const Reports = () => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchDailyReport = async () => {
      try {
        const res = await axios.get('http://localhost:3000/reports/daily', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setDailyData(res.data);
      } catch (err) {
        console.error("Report fetch failed");
      }
    };
    fetchDailyReport();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-bold text-gray-700">Daily Logistics Summary</h3>
        {dailyData.length > 0 && (
          <ExportButton data={dailyData} filename={`AlDhow_Report_${new Date().toLocaleDateString()}.csv`} />
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-sm font-semibold">Trip ID</th>
              <th className="p-4 text-sm font-semibold">Driver</th>
              <th className="p-4 text-sm font-semibold">Missing Crates</th>
              <th className="p-4 text-sm font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {dailyData.length > 0 ? dailyData.map((row) => (
              <tr key={row.alert_id} className="border-b">
                <td className="p-4 text-sm font-mono">{row.trip_id.slice(0, 8)}...</td>
                <td className="p-4 text-sm">{row.driver_id.slice(0, 8)}...</td>
                <td className="p-4 text-sm text-red-600 font-bold">{row.missing_count}</td>
                <td className="p-4 text-sm capitalize">{row.status}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-500">No missing crate alerts for today.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;