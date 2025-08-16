import React, { useState } from 'react';
import './admin.css';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/admin/login' : '/api/admin/register';
  
    try {
      const response = await fetch(`http://localhost:5008${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      console.log(data); // Log the response to see the returned error message
  
      if (response.ok) {
        setMessage(`✅ ${isLogin ? 'Admin Login' : 'Admin Registration'} successful!`);
        localStorage.setItem('admin', JSON.stringify(data.admin));
        if (isLogin) navigate('/admindashboard');
      } else {
        setMessage(`❌ ${data.error}`);
      }
    } catch (err) {
      console.error(`${isLogin ? 'Admin Login' : 'Admin Registration'} Error:`, err);
      setMessage('❌ Something went wrong.');
    }
  };
  
  return (
    <div className="admin-container">
      <h2>{isLogin ? 'Admin Login' : 'Admin Registration'}</h2>
      <form className="admin-form" onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        )}
        {!isLogin && (
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        <p className="toggle-link" onClick={() => {
          setIsLogin(!isLogin);
          setMessage('');
        }}>
          {isLogin ? "Don't have an account? Register here" : "Already have an account? Login"}
        </p>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default Admin;
