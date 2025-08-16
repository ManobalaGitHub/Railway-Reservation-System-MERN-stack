import React, { useState, useEffect } from 'react';

const Refund = () => {
  const [refundStatus, setRefundStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate fetching refund status (replace with actual API call)
  useEffect(() => {
    const fetchRefundStatus = () => {
      // Simulate delay for fetching refund status (you can replace it with an actual API call)
      setTimeout(() => {
        // Example status (could be "success", "pending", "failed")
        const status = 'success'; // Change this to test different statuses
        setRefundStatus(status);
        setLoading(false);
      }, 2000); // Simulating network request delay
    };

    fetchRefundStatus();
  }, []);

  const renderRefundMessage = () => {
    if (loading) {
      return <p>Loading refund status...</p>;
    }

    if (refundStatus === 'success') {
      return <p>Your refund has been processed successfully. You will receive the amount shortly.</p>;
    } else if (refundStatus === 'pending') {
      return <p>Your refund is being processed. Please check back later.</p>;
    } else if (refundStatus === 'failed') {
      return <p>Sorry, your refund could not be processed. Please try again later.</p>;
    }

    return <p>No refund status available.</p>;
  };

  return (
    <div style={styles.container}>
      <h2>Refund Status</h2>
      <div style={styles.statusContainer}>
        {renderRefundMessage()}
      </div>
      <button style={styles.backButton} onClick={() => window.location.href = '/Dashboard'}>
        Back to Dashboard
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    maxWidth: '500px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  statusContainer: {
    marginTop: '20px',
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#333',
  },
  backButton: {
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

export default Refund;
