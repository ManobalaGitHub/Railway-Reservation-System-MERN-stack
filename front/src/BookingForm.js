import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    source: '',
    destination: '',
    date: '',
    time: '',
    coachType: '',
  });

  const [pnr, setPnr] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      name: formData.name,
      age: formData.age,
      source: formData.source,
      destination: formData.destination,
      date: formData.date,
      time: formData.time,
      gender: formData.gender,
      coachType: formData.coachType,
    };

    try {
      const response = await fetch('http://localhost:5008/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();
      setPnr(result._id);
      alert('Ticket booked successfully!');

      localStorage.setItem('viewData', JSON.stringify({ ...bookingData, pnr: result._id }));

      navigate('/PaymentPage', { state: { bookingData, pnr: result._id } });
    } catch (err) {
      console.error("Error submitting booking:", err);
      alert('Booking failed.');
    }
  };

  return (
    <div style={{ padding: '30px', maxWidth: '600px', margin: 'auto', backgroundColor: '#f5f5f5', borderRadius: '10px', position: 'relative' }}>
      
      {/* Back to Dashboard button */}
      <button
        onClick={() => navigate('/dashboard')}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          padding: '8px 14px',
          backgroundColor: '#1976d2',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '14px'
        }}
      >
        Back to Dashboard
      </button>

      <h2>Book Your Ticket</h2>
      <form onSubmit={handleSubmit}>
        {['name', 'age', 'source', 'destination'].map((field) => (
          <div key={field} style={{ marginBottom: '15px' }}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type={field === 'age' ? 'number' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '6px' }}
            />
          </div>
        ))}

        <div style={{ marginBottom: '15px' }}>
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '6px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Time</label>
          <select
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '6px' }}
          >
            <option value="">Select Time</option>
            <option value="08:00">08:00 AM</option>
            <option value="10:00">10:00 AM</option>
            <option value="13:00">01:00 PM</option>
            <option value="15:00">03:00 PM</option>
            <option value="18:00">06:00 PM</option>
            <option value="20:00">08:00 PM</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '6px' }}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Coach Type</label>
          <select
            name="coachType"
            value={formData.coachType}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '6px' }}
          >
            <option value="">Select Coach Type</option>
            <option value="Sleeper">Sleeper</option>
            <option value="AC">AC</option>
            <option value="General">General</option>
          </select>
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            fontSize: '16px',
            borderRadius: '6px',
          }}
        >
          Submit Booking
        </button>
      </form>

      {pnr && (
        <div style={{ marginTop: '20px', textAlign: 'center', backgroundColor: '#d0f0c0', padding: '10px', borderRadius: '6px' }}>
          <strong>Your PNR:</strong> {pnr}
        </div>
      )}
    </div>
  );
};

export default BookingForm;
