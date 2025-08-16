import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookingDetails = () => {
  const [bookingData, setBookingData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedBookingData = localStorage.getItem('viewData');
    if (storedBookingData) {
      setBookingData(JSON.parse(storedBookingData)); // Fetch the stored booking data with PNR
    }
  }, []);

  return (
    <>
      {/* Cancel Ticket Button */}
      <button 
        style={styles.cancelButton} 
        onClick={() => navigate('/cancelpage')}
      >
        ❌ Cancel Ticket
      </button>

      {/* Back to Dashboard Button */}
      <button 
        style={styles.backButton} 
        onClick={() => navigate('/dashboard')}
      >
        ⬅ Back to Dashboard
      </button>

      <div style={styles.container}>
        <h2 style={styles.heading}>📄 Booking Details</h2>
        {bookingData ? (
          <div style={styles.card}>
            <ul style={styles.detailsList}>
              <li><span style={styles.label}>Name:</span> {bookingData.name}</li>
              <li><span style={styles.label}>Age:</span> {bookingData.age}</li>
              <li><span style={styles.label}>Gender:</span> {bookingData.gender}</li>
              <li><span style={styles.label}>Source:</span> {bookingData.source}</li>
              <li><span style={styles.label}>Destination:</span> {bookingData.destination}</li>
              <li><span style={styles.label}>Date:</span> {bookingData.date}</li>
              <li><span style={styles.label}>Time:</span> {bookingData.time || 'Not Available'}</li>
              <li><span style={styles.label}>PNR:</span> {bookingData.pnr}</li>
            </ul>
          </div>
        ) : (
          <p style={styles.noData}>No booking data found. Please make a booking first.</p>
        )}
      </div>
    </>
  );
};

const styles = {
  cancelButton: {
    position: 'fixed',
    top: '20px',
    left: '30px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '14px',
    zIndex: 1000
  },
  backButton: {
    position: 'fixed',
    top: '20px',
    right: '30px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '14px',
    zIndex: 1000
  },
  container: {
    padding: '40px',
    maxWidth: '600px',
    margin: '40px auto',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '28px',
    color: '#333',
    borderBottom: '2px solid #8e44ad',
    paddingBottom: '10px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
    transition: 'transform 0.2s ease-in-out',
  },
  detailsList: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    fontSize: '18px',
    lineHeight: '1.8',
    color: '#2c3e50',
  },
  label: {
    fontWeight: '600',
    color: '#8e44ad',
    display: 'inline-block',
    width: '120px',
  },
  noData: {
    textAlign: 'center',
    color: '#c0392b',
    fontWeight: 'bold',
    fontSize: '16px',
    backgroundColor: '#ffe6e6',
    padding: '15px',
    borderRadius: '8px',
  },
};

export default BookingDetails;
