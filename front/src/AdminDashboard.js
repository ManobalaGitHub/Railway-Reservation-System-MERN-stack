import React from 'react'; 
import { useNavigate } from 'react-router-dom';

// Reusable AdminCard component
const AdminCard = ({ icon, label, route }) => {
  const navigate = useNavigate();

  return (
    <div
      style={styles.card}
      onClick={() => navigate(route)}
      onKeyPress={(e) => e.key === 'Enter' && navigate(route)}
      role="button"
      tabIndex={0}
    >
      <span style={styles.icon}>{icon}</span>
      <span>{label}</span>
    </div>
  );
};

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // Add your logout logic here (e.g., clear session, tokens, etc.)
    navigate('/admin'); // Redirect to the login page
  };

  return (
    <div style={styles.container}>
      {/* Logout Button */}
      <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>

      {/* New Heading */}
      <h1 style={styles.mainHeading}>Railway Reservation System</h1>
      
      <h2 style={styles.heading}>🚂 Admin Dashboard</h2>
      
      <div style={styles.cardContainer}>
        <AdminCard icon="🎫" label="Manage Ticket Availability" route="/manage-tickets" />
        <AdminCard icon="📋" label="Train Schedule" route="/trainschedule" />
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '50px 20px',
    textAlign: 'center',
    background: 'linear-gradient(to right, #eef2f3, #8e9eab)',
    minHeight: '100vh',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  mainHeading: {
    fontSize: '50px',
    marginBottom: '40px',
    color: '#333',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  heading: {
    fontSize: '40px',
    marginBottom: '40px',
    color: '#333',
  },
  logoutButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
  logoutButtonHover: {
    backgroundColor: '#d32f2f',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '25px',
    justifyContent: 'center',
  },
  card: {
    width: '300px',
    height: '120px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '16px',
    boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
  },
  icon: {
    fontSize: '28px',
    marginBottom: '10px',
  },
};

styles.card[':hover'] = {
  transform: 'scale(1.05)',
  boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
};

export default AdminDashboard;
