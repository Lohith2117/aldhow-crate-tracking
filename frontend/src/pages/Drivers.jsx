import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [newDriver, setNewDriver] = useState({ name: '', phone: '', license_number: '' });

  useEffect(() => { fetchDrivers(); }, []);

  const fetchDrivers = async () => {
    const res = await axios.get('http://localhost:3000/drivers', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setDrivers(res.data);
  };

  const addDriver = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3000/drivers', newDriver, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setNewDriver({ name: '', phone: '', license_number: '' });
    fetchDrivers();
  };

  return (
    <div className="space-y-6">
      <form onSubmit={addDriver} className="bg-white p-6 rounded-lg shadow-sm border border-aldhow-blue/20">
        <h3 className="text-aldhow-blue font-bold mb-4">Register New Al-Dhow Driver</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input type="text" placeholder="Full Name" className="border p-2 rounded" value={newDriver.name} onChange={e => setNewDriver({...newDriver, name: e.target.value})} required />
          <input type="text" placeholder="Phone Number" className="border p-2 rounded" value={newDriver.phone} onChange={e => setNewDriver({...newDriver, phone: e.target.value})} required />
          <input type="text" placeholder="License #" className="border p-2 rounded" value={newDriver.license_number} onChange={e => setNewDriver({...newDriver, license_number: e.target.value})} />
        </div>
        <button type="submit" className="mt-4 bg-aldhow-blue text-white px-6 py-2 rounded font-bold hover:bg-blue-600">Add Driver</button>
      </form>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden border">
        <table className="w-full text-left">
          <thead className="bg-aldhow-light">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Phone</th>
              <th className="p-4">License</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map(d => (
              <tr key={d.driver_id} className="border-t">
                <td className="p-4 font-semibold">{d.name}</td>
                <td className="p-4">{d.phone}</td>
                <td className="p-4">{d.license_number}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${d.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {d.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Drivers;