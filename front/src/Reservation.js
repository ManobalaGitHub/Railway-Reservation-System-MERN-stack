import React, { useEffect, useState } from 'react';

// Coach information (initial total capacity)
const coachTypes = [
  { type: 'General (UR)', coaches: 10, seatsPerCoach: 100 },
  { type: 'Sleeper (SL)', coaches: 8, seatsPerCoach: 72 },
  { type: 'AC 3-Tier (3A)', coaches: 2, seatsPerCoach: 64 },
  { type: 'AC 2-Tier (2A)', coaches: 1, seatsPerCoach: 46 },
  { type: 'Chair Car (CC)', coaches: 1, seatsPerCoach: 90 },
  { type: 'AC 1st Class (1A)', coaches: 1, seatsPerCoach: 22 },
];

const Reservation = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    setBookings(storedBookings);
  }, []);

  // Count total bookings (assuming each booking is 1 seat)
  const totalSeatsBooked = bookings.length;

  // Calculate total seats available
  const totalSeatsAvailable = coachTypes.reduce((sum, coach) => {
    return sum + coach.coaches * coach.seatsPerCoach;
  }, 0);

  const remainingSeats = totalSeatsAvailable - totalSeatsBooked;

  return (
    <div style={styles.container}>
      <h2>🚆 Train Reservation Summary</h2>
      <p><strong>Total Capacity:</strong> {totalSeatsAvailable} seats</p>
      <p><strong>Total Booked:</strong> {totalSeatsBooked} seats</p>
      <p><strong>Remaining Seats:</strong> {remainingSeats} seats</p>

      <h3>Coach-wise Capacity</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Coach Type</th>
            <th>No. of Coaches</th>
            <th>Seats per Coach</th>
            <th>Total Seats</th>
          </tr>
        </thead>
        <tbody>
          {coachTypes.map((coach, index) => (
            <tr key={index}>
              <td>{coach.type}</td>
              <td>{coach.coaches}</td>
              <td>{coach.seatsPerCoach}</td>
              <td>{coach.coaches * coach.seatsPerCoach}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '30px auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  th: {
    backgroundColor: '#f0f0f0',
    padding: '10px',
  },
  td: {
    border: '1px solid #ccc',
    padding: '10px',
  },
};

export default Reservation;
