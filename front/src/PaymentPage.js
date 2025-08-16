import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookingData, pnr } = location.state || {};

  const [paymentMode, setPaymentMode] = useState("Credit Card");
  const [cardDetails, setCardDetails] = useState({
    number: "1234567812345678",
    expiry: "12/25",
    cvv: "123",
  });

  const handleConfirmPayment = () => {
    if (!pnr || !bookingData) {
      alert('Invalid booking data.');
      return;
    }

    // Validate card only if card is selected
    if (
      (paymentMode === "Credit Card" || paymentMode === "Debit Card") &&
      (
        cardDetails.number !== "1234567812345678" ||
        cardDetails.expiry !== "12/25" ||
        cardDetails.cvv !== "123"
      )
    ) {
      alert("❌ Invalid Card Details. Please use the demo card.");
      return;
    }

    // Simulate successful payment
    alert(`✅ Payment of ₹500 via ${paymentMode} was successful!`);
    navigate("/Dashboard");
  };

  if (!bookingData || !pnr) {
    return <p style={{ textAlign: 'center' }}>No booking data available for payment.</p>;
  }

  return (
    <div style={styles.container}>
      <h2>Confirm Your Payment</h2>
      <div style={styles.details}>
        <p><strong>Name:</strong> {bookingData.name}</p>
        <p><strong>Age:</strong> {bookingData.age}</p>
        <p><strong>Gender:</strong> {bookingData.gender}</p>
        <p><strong>From:</strong> {bookingData.source}</p>
        <p><strong>To:</strong> {bookingData.destination}</p>
        <p><strong>Date:</strong> {bookingData.date}</p>
        <p><strong>Time:</strong> {bookingData.time}</p>
        <p><strong>Coach Type:</strong> {bookingData.coachType}</p>
        <p><strong>PNR:</strong> {pnr}</p>
        <p><strong>Amount:</strong> ₹500</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label><strong>Payment Method:</strong></label>
        <select
          style={styles.select}
          value={paymentMode}
          onChange={(e) => setPaymentMode(e.target.value)}
        >
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
          <option value="UPI">UPI</option>
          <option value="GPay">GPay</option>
        </select>
      </div>

      {(paymentMode === "Credit Card" || paymentMode === "Debit Card") ? (
        <div style={styles.cardForm}>
          <input
            style={styles.input}
            placeholder="Card Number"
            maxLength={16}
            value={cardDetails.number}
            onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
          />
          <input
            style={styles.input}
            placeholder="MM/YY"
            maxLength={5}
            value={cardDetails.expiry}
            onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
          />
          <input
            style={styles.input}
            placeholder="CVV"
            maxLength={3}
            type="password"
            value={cardDetails.cvv}
            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
          />
        </div>
      ) : (
        <div style={styles.qrSection}>
          <p><strong>Scan QR with {paymentMode}</strong></p>
          <img
            src="https://tse4.mm.bing.net/th/id/OIP.7tyX1Xidp0v6KLVdeBD3wgHaHa?pid=Api&P=0&h=180"
            alt="QR Scanner"
            style={{ width: '200px', marginTop: '10px', borderRadius: '10px' }}
          />
          <p style={{ fontSize: '12px', color: '#666' }}>Use your {paymentMode} app to scan</p>
        </div>
      )}

      <button style={styles.button} onClick={handleConfirmPayment}>
        💳 Confirm Payment
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    maxWidth: '500px',
    margin: '0 auto',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  details: {
    marginBottom: '20px',
    lineHeight: '1.6',
  },
  select: {
    padding: '10px',
    width: '100%',
    borderRadius: '6px',
    marginTop: '5px',
  },
  cardForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  qrSection: {
    marginBottom: '20px',
  },
  button: {
    padding: '12px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%',
  },
};

export default PaymentPage;
