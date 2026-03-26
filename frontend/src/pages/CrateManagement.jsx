import React, { useState } from 'react';
import axios from 'axios';

const CrateManagement = () => {
  const [count, setCount] = useState(10);
  const [barcodes, setBarcodes] = useState([]);

  const generateBarcodes = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/crates/generate?n=${count}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setBarcodes(res.data.barcodes); // IDs like CRT-20260325-XXXXX [cite: 75]
    } catch (err) {
      alert("Error generating barcodes");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-bold mb-4 text-aldhow-blue">Generate New Barcodes</h3>
      <div className="flex gap-4 mb-6">
        <input 
          type="number" 
          value={count} 
          onChange={(e) => setCount(e.target.value)}
          className="border p-2 rounded w-24"
        />
        <button 
          onClick={generateBarcodes}
          className="bg-aldhow-blue text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Generate & Register in DB
        </button>
      </div>

      {barcodes.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 border-t pt-4">
          {barcodes.map(code => (
            <div key={code} className="bg-gray-50 p-2 text-xs border font-mono rounded">
              {code}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CrateManagement;