import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate fields
    if (!username || !email) {
      setError('Please fill in all fields');
      return;
    }

    // Create a user object
    const user = { username, email };

    // Store user data in localStorage
    localStorage.setItem('user', JSON.stringify(user));

    // Navigate to the profile page
    navigate('/profile');
  };

  const styles = {
    container: {
      maxWidth: '500px',
      margin: '40px auto',
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      backgroundColor: '#f9f9f9',
      textAlign: 'center'
    },
    title: {
      fontSize: '24px',
      marginBottom: '20px',
      color: '#5a005a'
    },
    input: {
      width: '100%',
      padding: '12px',
      margin: '10px 0',
      fontSize: '16px',
      borderRadius: '6px',
      border: '1px solid #ccc'
    },
    button: {
      width: '100%',
      padding: '14px',
      fontSize: '16px',
      backgroundColor: '#4CAF50',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer'
    },
    error: {
      color: 'red',
      fontSize: '14px',
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🚀 Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        {error && <div style={styles.error}>{error}</div>}
        <button type="submit" style={styles.button}>Register</button>
      </form>
    </div>
  );
};

export default Register;
