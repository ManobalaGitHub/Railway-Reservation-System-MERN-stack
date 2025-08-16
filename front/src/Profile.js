import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');

    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        if (parsedUser && parsedUser.email) {
          setUser(parsedUser);
        } else {
          // If data structure is invalid, clear it
          localStorage.removeItem('user');
          navigate('/User');
        }
      } catch (error) {
        console.error("❌ Error parsing user data:", error);
        localStorage.removeItem('user');
        navigate('/User');
      }
    } else {
      navigate('/User');
    }

    setLoading(false);
  }, [navigate]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No user data found!</p>;

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-details">
        <p><strong>Email:</strong> {user.email}</p>
        {/* Add more user fields here if needed */}
      </div>
      <button 
        className="back-to-dashboard" 
        onClick={() => navigate('/dashboard')}
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default Profile;
