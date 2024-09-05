import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const apiUrl = process.env.REACT_APP_BACKEND_URL;

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${apiUrl}/api/admin/login`, { email, password });
      localStorage.setItem('token', data.token); // Store token in localStorage
      navigate('/adminpanel'); // Redirect to protected dashboard
    } catch (error) {
      setError('Invalid login credentials');
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default AdminLogin;
