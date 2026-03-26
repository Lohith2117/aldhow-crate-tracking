import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CrateManagement from './pages/CrateManagement';
import Alerts from './pages/Alerts';
import Drivers from './pages/Drivers';
import Reports from './pages/Reports';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route: Staff can access this to authenticate */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes: All warehouse data is wrapped in the Gatekeeper */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* Nested Routes inside the Authenticated Layout */}
          <Route index element={<Dashboard />} />
          <Route path="crates" element={<CrateManagement />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="drivers" element={<Drivers />} />
          <Route path="reports" element={<Reports />} />
        </Route>

        {/* Catch-all: Redirect unknown paths to Dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;