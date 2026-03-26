import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/auth/login', credentials);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/'); // Redirect to Dashboard on success [cite: 58]
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-aldhow-light">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 border-t-4 border-aldhow-blue">
        <h2 className="text-2xl font-bold text-aldhow-blue mb-6 text-center">Al-Dhow Login</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="text" 
            placeholder="Username" 
            className="w-full border p-2 rounded"
            onChange={(e) => setCredentials({...credentials, username: e.target.value})}
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full border p-2 rounded"
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            required 
          />
          <button type="submit" className="w-full bg-aldhow-blue text-white py-2 rounded font-bold hover:bg-blue-600">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;