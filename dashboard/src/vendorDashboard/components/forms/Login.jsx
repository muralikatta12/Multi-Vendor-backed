import React, { useState } from 'react';
import { ApiPath } from '../../data/ApiPath';

const Login = ({ showWelcomeHandler }) => {  // Fixed props destructuring
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${ApiPath}/vendor/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const text = await response.text();
      console.log('Raw response:', text);

      if (!text.trim()) {
        throw new Error('Empty response from server');
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch (error) {
        throw new Error('Invalid JSON response from server');
      }

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Successful login
      alert('Login successful');
      setEmail('');
      setPassword('');
      localStorage.setItem('loginToken', data.token);
      
      setTimeout(() => {
        showWelcomeHandler(); // Redirect after short delay
      }, 1000);
      
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginSection">
      <h3>Vendor Login</h3>
      <form className="authForm" onSubmit={handleSubmit}>
        <label>Email</label><br />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        /><br />

        <label>Password</label><br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        /><br />

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <div className="loading-spinner"></div>}
    </div>
  );
};

export default Login;
