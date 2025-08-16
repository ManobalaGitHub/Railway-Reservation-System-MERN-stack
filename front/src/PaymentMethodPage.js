import React, { useState } from 'react';

const PaymentMethodPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // You can perform validation here based on the payment method selected.
    if (paymentMethod === 'card') {
      if (!cardNumber || !expirationDate || !cvv) {
        alert('Please fill out all credit card details.');
        return;
      }
      alert('Credit Card Payment Details Submitted');
    } else if (paymentMethod === 'paypal') {
      if (!paypalEmail) {
        alert('Please enter your PayPal email.');
        return;
      }
      alert('PayPal Payment Details Submitted');
    }
  };

  return (
    <div style={{ padding: '30px', maxWidth: '500px', margin: 'auto', backgroundColor: '#f5f5f5', borderRadius: '10px' }}>
      <h2>Choose Payment Method</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="radio"
            id="credit-card"
            name="payment-method"
            value="card"
            checked={paymentMethod === 'card'}
            onChange={handlePaymentMethodChange}
          />
          <label htmlFor="credit-card">Credit Card</label>
        </div>
        <div>
          <input
            type="radio"
            id="paypal"
            name="payment-method"
            value="paypal"
            checked={paymentMethod === 'paypal'}
            onChange={handlePaymentMethodChange}
          />
          <label htmlFor="paypal">PayPal</label>
        </div>

        {paymentMethod === 'card' && (
          <div>
            <div>
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="Enter your card number"
                required
                style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
              />
            </div>
            <div>
              <label htmlFor="expirationDate">Expiration Date (MM/YY)</label>
              <input
                type="text"
                id="expirationDate"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                placeholder="MM/YY"
                required
                style={{ width: '48%', padding: '8px', marginBottom: '10px', marginRight: '4%' }}
              />
              <label htmlFor="cvv">CVV</label>
              <input
                type="text"
                id="cvv"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="CVV"
                required
                style={{ width: '48%', padding: '8px', marginBottom: '10px' }}
              />
            </div>
          </div>
        )}

        {paymentMethod === 'paypal' && (
          <div>
            <div>
              <label htmlFor="paypalEmail">PayPal Email</label>
              <input
                type="email"
                id="paypalEmail"
                value={paypalEmail}
                onChange={(e) => setPaypalEmail(e.target.value)}
                placeholder="Enter your PayPal email"
                required
                style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            marginTop: '20px',
            width: '100%',
          }}
        >
          Submit Payment
        </button>
      </form>
    </div>
  );
};

export default PaymentMethodPage;
