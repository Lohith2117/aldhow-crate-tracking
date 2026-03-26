import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <nav className="w-64 bg-aldhow-blue text-white p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-8">Al-Dhow Crate</h1>
        <ul className="space-y-4">
          <li><Link to="/" className="hover:underline block p-2 rounded">Overview</Link></li>
          <li><Link to="/crates" className="hover:underline block p-2 rounded">Crate Management</Link></li>
          <li><Link to="/trips" className="hover:underline block p-2 rounded">Trip Details</Link></li>
          <li><Link to="/alerts" className="hover:underline block p-2 rounded text-red-100 font-semibold">Alerts</Link></li>
          <li><Link to="/drivers" className="hover:underline block p-2 rounded">Drivers</Link></li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-aldhow-light p-8">
        <header className="flex justify-between items-center mb-8 border-b pb-4 bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-700">Warehouse Logistics</h2>
          <div className="text-aldhow-blue font-medium">Admin Dashboard</div>
        </header>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;