import React, { useState } from 'react';
import { ApiPath } from '../../data/ApiPath';

const Register = ({ showLoginHandler }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false); // New state for transition

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${ApiPath}/vendor/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Registration Response:', data);

      setUsername('');
      setEmail('');
      setPassword('');

      alert('Vendor registered successfully');
      setLoading(false);
      setRedirecting(true); // Show spinner before navigating

      setTimeout(() => {
        if (showLoginHandler) {
          showLoginHandler();
        }
      }, 1000); // Wait for 1 second before switching
    } catch (error) {
      console.error('Error registering vendor:', error);
      setError(error.message);
      alert(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="registerSection">
      <form className="authForm" onSubmit={handleSubmit}>
        <h3>Vendor Register</h3>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <label>User Name</label><br />
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your name" /><br />

        <label>Email</label><br />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" /><br />

        <label>Password</label><br />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" /><br />

        <div className="btnSubmit">
          <button type="submit" disabled={loading || redirecting}>
            {loading ? 'Registering...' : redirecting ? 'Redirecting...' : 'Register'}
          </button>
        </div>

        {/* Show Loading Spinner */}
        {(loading || redirecting) && <div className="loading-spinner"></div>}
      </form>
    </div>
  );
};

export default Register;
