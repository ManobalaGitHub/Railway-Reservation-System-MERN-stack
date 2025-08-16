import React, { useState, useEffect } from 'react';
import './User.css';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 8) {
      setMessage('❌ Password must be at least 8 characters long.');
      return;
    }

    const endpoint = isLogin ? '/api/login' : '/api/register';

    try {
      const response = await fetch(`http://localhost:5008${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('API response data:', data);

      if (response.ok) {
        setMessage(`✅ ${isLogin ? 'Login' : 'Registration'} successful!`);
        localStorage.setItem('user', JSON.stringify(data.user));
        if (isLogin) navigate('/dashboard');
      } else {
        setMessage(`❌ ${data.error || 'Something went wrong.'}`);
      }
    } catch (err) {
      console.error(`${isLogin ? 'Login' : 'Registration'} Error:`, err);
      setMessage('❌ Something went wrong.');
    }
  };

  return (
    <div className="login-container">
      <h2>{isLogin ? 'User Login' : 'User Registration'}</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <div className="password-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={8}
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>

        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>

        <p
          className="toggle-link"
          onClick={() => {
            setIsLogin(!isLogin);
            setMessage('');
          }}
        >
          {isLogin
            ? "Don't have an account? Register here"
            : 'Already have an account? Login'}
        </p>

        {message && (
          <p className={`message ${message.includes('❌') ? 'error' : 'success'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default User;
