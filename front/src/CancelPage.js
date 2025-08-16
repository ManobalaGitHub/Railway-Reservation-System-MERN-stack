import React from 'react';
import { useNavigate } from 'react-router-dom';

const CancelPage = () => {
  const bookingData = JSON.parse(localStorage.getItem('viewData')); // Get from booking details
  const navigate = useNavigate();

  const handleRefund = () => {
    alert("Refund processed successfully!");
    navigate('/refund'); // navigate to refund confirmation
  };

  return (
    <div style={styles.container}>
      <h2>Ticket Cancellation</h2>
      {bookingData ? (
        <ul style={styles.list}>
          <li><strong>Name:</strong> {bookingData.name}</li>
          <li><strong>Age:</strong> {bookingData.age}</li>
          <li><strong>Gender:</strong> {bookingData.gender}</li>
          <li><strong>Source:</strong> {bookingData.source}</li>
          <li><strong>Destination:</strong> {bookingData.destination}</li>
          <li><strong>Date:</strong> {bookingData.date}</li>
          <li><strong>PNR:</strong> {bookingData.pnr}</li>
        </ul>
      ) : (
        <p>No ticket cancellation data found.</p>
      )}

      <button onClick={handleRefund} style={styles.refundButton}>
        💵 Refund
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    maxWidth: '500px',
    margin: '0 auto',
    backgroundColor: '#fff3f3',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(255,0,0,0.1)',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    lineHeight: '1.8',
    fontSize: '16px',
  },
  refundButton: {
    marginTop: '20px',
    padding: '12px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%',
  },
};

export default CancelPage;
