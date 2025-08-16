import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [showSchedule, setShowSchedule] = useState(false);

  const today = new Date().toLocaleDateString();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/User');
  };

  const handleSearch = () => {
    if (!source || !destination) {
      alert('Please select both source and destination');
      return;
    }
    setShowSchedule(true);
  };

  const styles = {
    header: {
      background: 'linear-gradient(to right, #1a0033, #5a005a)',
      color: '#fff',
      padding: '20px',
      textAlign: 'center',
      position: 'relative',
      borderBottom: '5px solid orange',
    },
    logo: {
      fontSize: '26px',
      fontWeight: 'bold',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px',
    },
    subHeader: {
      color: '#ff99cc',
      fontWeight: 'bold',
      fontSize: '18px',
    },
    date: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      fontSize: '14px',
    },
    navBar: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      backgroundColor: '#000',
      padding: '10px',
      gap: '10px',
    },
    navItem: {
      color: '#fff',
      backgroundColor: '#222',
      padding: '10px 15px',
      borderRadius: '6px',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      textDecoration: 'none',
    },
    journeyMsg: {
      color: 'blue',
      textAlign: 'center',
      fontWeight: 'bold',
      padding: '10px',
    },
    searchSection: {
      backgroundColor: '#f4f4f4',
      padding: '20px',
      textAlign: 'center',
    },
    select: {
      margin: '0 8px',
      padding: '6px',
      borderRadius: '5px',
    },
    searchButton: {
      padding: '6px 16px',
      borderRadius: '5px',
      backgroundColor: '#333',
      color: '#fff',
      cursor: 'pointer',
      border: 'none',
    },
    imageContainer: {
      textAlign: 'center',
      padding: '0px',
      margin: '0 auto',
      width: '100%',
    },
    image: {
      width: '95%',
      maxWidth: '1600px',
      height: 'auto',
      borderRadius: '12px',
      boxShadow: '0 0 10px rgba(0,0,0,0.3)',
    },
    scheduleBox: {
      backgroundColor: '#fff',
      padding: '20px',
      margin: '20px auto',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      textAlign: 'center',
      maxWidth: '600px',
    },
  };

  const schedules = [
    // Existing routes
    {
      source: 'sivakasi',
      destination: 'madurai',
      number: 'SVI-MDU01',
      name: 'Sivakasi to Madurai Passenger',
      departure: '06:30 AM',
      arrival: '08:00 AM',
      class: 'General',
      fare: '₹40',
    },
    {
      source: 'madurai',
      destination: 'chennai',
      number: 'MDU-MS02',
      name: 'Madurai to Chennai Local',
      departure: '05:30 AM',
      arrival: '11:30 AM',
      class: 'Sleeper',
      fare: '₹180',
    },
    {
      source: 'sivakasi',
      destination: 'rajapalayam',
      number: 'SVKS-RPY03',
      name: 'Sivakasi to Rajapalayam Local',
      departure: '06:30 AM',
      arrival: '07:15 AM',
      class: 'General',
      fare: '₹30',
    },
    // Additional routes for other districts in Tamil Nadu
    {
      source: 'coimbatore',
      destination: 'trichy',
      number: 'CBE-TPY01',
      name: 'Coimbatore to Trichy Express',
      departure: '08:00 AM',
      arrival: '10:30 AM',
      class: 'AC',
      fare: '₹150',
    },
    {
      source: 'chennai',
      destination: 'tirunelveli',
      number: 'MS-TVE02',
      name: 'Chennai to Tirunelveli Superfast',
      departure: '06:00 AM',
      arrival: '02:00 PM',
      class: 'Sleeper',
      fare: '₹250',
    },
    {
      source: 'madurai',
      destination: 'vijayawada',
      number: 'MDU-VJA01',
      name: 'Madurai to Vijayawada Express',
      departure: '04:45 AM',
      arrival: '08:00 PM',
      class: 'AC',
      fare: '₹450',
    },
    {
      source: 'trichy',
      destination: 'salem',
      number: 'TPY-SLM02',
      name: 'Trichy to Salem Express',
      departure: '09:15 AM',
      arrival: '11:45 AM',
      class: 'General',
      fare: '₹80',
    },
    {
      source: 'tiruvarur',
      destination: 'nagapattinam',
      number: 'TVR-NPM03',
      name: 'Tiruvarur to Nagapattinam Local',
      departure: '07:30 AM',
      arrival: '08:30 AM',
      class: 'General',
      fare: '₹20',
    },
    {
      source: 'chennai',
      destination: 'pondicherry',
      number: 'MS-PDY01',
      name: 'Chennai to Pondicherry Express',
      departure: '07:00 AM',
      arrival: '09:30 AM',
      class: 'Sleeper',
      fare: '₹100',
    },
  ];

  const filteredTrains = schedules.filter(
    (train) => train.source === source.toLowerCase() && train.destination === destination.toLowerCase()
  );

  return (
    <div>
      <div style={styles.header}>
        <div style={styles.logo}>
          🚆 <span>Railway Reservation System <b>IN</b></span>
        </div>
        <div style={styles.subHeader}>Welcome to the Railway Reservation System</div>
        <div style={styles.date}>{today}</div>
      </div>

      <div style={styles.navBar}>
        <Link to="/BookingForm" style={styles.navItem}>Booking Form</Link>
        <Link to="/bookingdetails" style={styles.navItem}>View Booking</Link>
        <Link to="/pnrstatus" style={styles.navItem}>PNR Status</Link>
        <Link to="/User" style={styles.navItem}>Register</Link>
        <Link to="/User" style={styles.navItem}>Login</Link>
        <Link to="/Profile" style={styles.navItem}>Profile</Link>
        <button
          style={{ ...styles.navItem, backgroundColor: '#ff4444' }}
          onClick={handleLogout}
        >
          🚪 Logout
        </button>
      </div>

      <div style={styles.journeyMsg}>Have a Safe Journey!</div>

      <div style={styles.searchSection}>
        <select style={styles.select} value={source} onChange={(e) => setSource(e.target.value)}>
          <option value="">Select Source</option>
          <option value="sivakasi">Sivakasi</option>
          <option value="madurai">Madurai</option>
          <option value="chennai">Chennai</option>
          <option value="coimbatore">Coimbatore</option>
          <option value="trichy">Trichy</option>
          <option value="tiruvarur">Tiruvarur</option>
        </select>
        to
        <select style={styles.select} value={destination} onChange={(e) => setDestination(e.target.value)}>
          <option value="">Select Destination</option>
          <option value="madurai">Madurai</option>
          <option value="chennai">Chennai</option>
          <option value="rajapalayam">Rajapalayam</option>
          <option value="trichy">Trichy</option>
          <option value="salem">Salem</option>
          <option value="pondicherry">Pondicherry</option>
          <option value="vijayawada">Vijayawada</option>
        </select>
        <button style={styles.searchButton} onClick={handleSearch}>Search</button>
      </div>

      {showSchedule && (
        <div style={styles.scheduleBox}>
          <h3>🚆 Available Trains</h3>
          <p><strong>From:</strong> {source.charAt(0).toUpperCase() + source.slice(1)}</p>
          <p><strong>To:</strong> {destination.charAt(0).toUpperCase() + destination.slice(1)}</p>
          {filteredTrains.length === 0 ? (
            <p style={{ color: 'red' }}>No trains available for this route.</p>
          ) : (
            <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#eee' }}>
                  <th style={{ padding: '10px', border: '1px solid #ccc' }}>Train No</th>
                  <th style={{ padding: '10px', border: '1px solid #ccc' }}>Train Name</th>
                  <th style={{ padding: '10px', border: '1px solid #ccc' }}>Departure</th>
                  <th style={{ padding: '10px', border: '1px solid #ccc' }}>Arrival</th>
                  <th style={{ padding: '10px', border: '1px solid #ccc' }}>Class</th>
                  <th style={{ padding: '10px', border: '1px solid #ccc' }}>Fare</th>
                  <th style={{ padding: '10px', border: '1px solid #ccc' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTrains.map((train, index) => (
                  <tr key={index}>
                    <td style={{ padding: '10px', border: '1px solid #ccc' }}>{train.number}</td>
                    <td style={{ padding: '10px', border: '1px solid #ccc' }}>{train.name}</td>
                    <td style={{ padding: '10px', border: '1px solid #ccc' }}>{train.departure}</td>
                    <td style={{ padding: '10px', border: '1px solid #ccc' }}>{train.arrival}</td>
                    <td style={{ padding: '10px', border: '1px solid #ccc' }}>{train.class}</td>
                    <td style={{ padding: '10px', border: '1px solid #ccc' }}>{train.fare}</td>
                    <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                      <button
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#28a745',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                        }}
                        onClick={() => navigate('/BookingForm')}
                      >
                        Book Now
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      <div style={styles.imageContainer}>
        <img
          src="https://www.theurbanist.org/wp-content/uploads/2022/12/New-Amtrak-Cascades-Train.jpeg"
          style={styles.image}
          alt="Train"
        />
      </div>
    </div>
  );
};

export default HomePage;
