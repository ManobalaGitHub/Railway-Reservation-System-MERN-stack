import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PNRStatus = () => {
  const [pnr, setPnr] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const checkPNRStatus = () => {
    if (!pnr.trim()) {
      setError('❗ Please enter a valid PNR number.');
      setStatus('');
      return;
    }

    setError('');

    const storedBooking = localStorage.getItem('viewData');

    if (storedBooking) {
      try {
        const booking = JSON.parse(storedBooking);

        if (booking.pnr === pnr.trim()) {
          if (!booking.seat) {
            const assignedSeat = Math.floor(Math.random() * 50) + 1;
            booking.seat = `S-${assignedSeat}`;
            localStorage.setItem('viewData', JSON.stringify(booking));
          }

          setStatus(`✅ Booking Confirmed - Name: ${booking.name}, Seat: ${booking.seat}`);
        } else {
          setStatus(`❌ No booking found with PNR: ${pnr}`);
        }
      } catch (e) {
        setStatus('⚠️ Error reading booking data.');
      }
    } else {
      setStatus('📭 No booking data found. Please make a booking first.');
    }
  };

  const styles = {
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
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '120px',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
    },
    input: {
      padding: '10px',
      fontSize: '16px',
      marginBottom: '10px',
      width: '300px',
      borderRadius: '5px',
      border: '1px solid #ccc'
    },
    button: {
      padding: '10px 20px',
      fontSize: '16px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer'
    },
    result: {
      marginTop: '20px',
      fontSize: '18px',
      color: 'green'
    },
    error: {
      color: 'red',
      marginTop: '10px',
      fontWeight: 'bold'
    }
  };

  return (
    <>
      <button style={styles.backButton} onClick={() => navigate('/dashboard')}>
        ⬅ Back to Dashboard
      </button>

      <div style={styles.container}>
        <h2>🔍 PNR Status Checker</h2>
        <input
          type="text"
          placeholder="Enter PNR"
          value={pnr}
          onChange={(e) => setPnr(e.target.value)}
          style={styles.input}
        />
        <button onClick={checkPNRStatus} style={styles.button}>
          Check Status
        </button>

        {error && <div style={styles.error}>{error}</div>}
        {status && <div style={styles.result}>{status}</div>}
      </div>
    </>
  );
};

export default PNRStatus;
