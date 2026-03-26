import React from 'react';

const ExportButton = ({ data, filename = "aldhow_report.csv" }) => {
  const convertToCSV = (objArray) => {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = `${Object.keys(array[0]).join(",")}\r\n`;

    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (let index in array[i]) {
        if (line !== '') line += ',';
        line += array[i][index];
      }
      str += line + '\r\n';
    }
    return str;
  };

  const downloadCSV = () => {
    const csvData = new Blob([convertToCSV(data)], { type: 'text/csv;charset=utf-8;' });
    const csvURL = window.URL.createObjectURL(csvData);
    const tempLink = document.createElement('a');
    tempLink.href = csvURL;
    tempLink.setAttribute('download', filename);
    tempLink.click();
  };

  return (
    <button onClick={downloadCSV} className="bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-black transition-colors">
      Download CSV Report
    </button>
  );
};

export default ExportButton;