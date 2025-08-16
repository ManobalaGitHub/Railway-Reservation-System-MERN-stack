import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './train.css';

function App() {
  const [trainData, setTrainData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const data = [
      {
        name: "Sivakasi to Madurai Passenger",
        source: "Sivakasi Junction (SVI)",
        destination: "Madurai Junction (MDU)",
        startTime: "06:30",
        departureTime: "06:30 from Sivakasi",
        arrivalTime: "08:00 at Madurai",
        duration: "Approximately 1 hour 30 minutes",
        schedule: "This is a daily passenger service connecting Sivakasi to Madurai, passing through key towns in Tamil Nadu. The train stops at smaller stations along the route, providing affordable and efficient travel."
      },
      {
        name: "Madurai to Chennai Local Train",
        source: "Madurai Junction (MDU)",
        destination: "Chennai Egmore (MS)",
        startTime: "05:30",
        departureTime: "05:30 from Madurai",
        arrivalTime: "11:30 at Chennai Egmore",
        duration: "Approximately 6 hours",
        schedule: "This is a popular daily express train that connects Madurai with Chennai, stopping at key towns along the way. It is a faster option for travelers making the journey between these two major cities in Tamil Nadu."
      },
      {
        name: "Sivakasi to Rajapalayam Local Train",
        source: "Sivakasi Junction (SVKS)",
        destination: "Rajapalayam Junction (RPY)",
        startTime: "06:30",
        departureTime: "06:30 from Sivakasi",
        arrivalTime: "07:15 at Rajapalayam",
        duration: "Approximately 45 minutes",
        schedule: "This is a daily passenger train, providing an essential connection between Sivakasi and Rajapalayam, which are two important towns in Tamil Nadu. The train is used by locals for daily commuting and offers a convenient option for short-distance travel."
      },
      {
        name: "Tamil Nadu Express (12622)",
        source: "New Delhi (NDLS)",
        destination: "MGR Chennai Central (MAS)",
        startTime: "21:05",
        departureTime: "21:05 from NDLS",
        arrivalTime: "06:35 at MAS",
        duration: "Approximately 33 hours 30 minutes"
      },
      {
        name: "Tamil Nadu Express (12621)",
        source: "MGR Chennai Central (MAS)",
        destination: "New Delhi (NDLS)",
        startTime: "22:00",
        departureTime: "22:00 from MAS",
        arrivalTime: "06:30 at NDLS",
        duration: "Approximately 32 hours 30 minutes"
      },
      {
        name: "Chennai Egmore–Nagercoil Vande Bharat Express",
        source: "Chennai Egmore",
        destination: "Nagercoil",
        startTime: "06:00",
        departureTime: "06:00 from Chennai Egmore",
        arrivalTime: "13:45 at Nagercoil",
        duration: "Approximately 7 hours 45 minutes",
        highlights: "Saves more than 2 hours compared to existing services."
      },
      {
        name: "Madurai–Bengaluru Vande Bharat Express",
        source: "Madurai",
        destination: "Bengaluru",
        startTime: "07:30",
        departureTime: "07:30 from Madurai",
        arrivalTime: "12:15 at Bengaluru",
        duration: "Approximately 4 hours 45 minutes",
        highlights: "Enhances connectivity with reduced travel time."
      },
      {
        name: "Ananthapuri Superfast Express",
        source: "Chennai Egmore (MS)",
        destination: "Kollam Junction (QLN)",
        startTime: "05:15",
        departureTime: "05:15 from Chennai Egmore",
        arrivalTime: "11:30 at Kollam Junction",
        duration: "Approximately 6 hours 15 minutes",
        schedule: "Operates daily, connecting key cities in Tamil Nadu and Kerala."
      },
      {
        name: "Andaman Express",
        source: "Chennai Central (MAS)",
        destination: "Shri Mata Vaishno Devi Katra (SVDK)",
        startTime: "21:30",
        departureTime: "21:30 from Chennai Central",
        arrivalTime: "05:00 at Shri Mata Vaishno Devi Katra",
        duration: "Approximately 37 hours 30 minutes",
        schedule: "Provides connectivity to northern India."
      },
      {
        name: "Anga Express",
        source: "Coimbatore Junction (CBE)",
        destination: "Bhagalpur (BGP)",
        startTime: "15:45",
        departureTime: "15:45 from Coimbatore",
        arrivalTime: "23:00 at Bhagalpur",
        duration: "Approximately 7 hours 15 minutes",
        schedule: "Connects Tamil Nadu with Bihar."
      },
      {
        name: "Arakkonam–Jolarpettai Express",
        source: "Arakkonam Junction (AJJ)",
        destination: "Jolarpettai Junction (JTJ)",
        startTime: "06:00",
        departureTime: "06:00 from Arakkonam",
        arrivalTime: "08:30 at Jolarpettai",
        duration: "Approximately 2 hours 30 minutes",
        schedule: "Vital link within Tamil Nadu."
      },
      {
        name: "Mysuru–Arsikere Passenger",
        source: "Mysuru Junction (MYS)",
        destination: "Arsikere Junction (ASK)",
        startTime: "08:15",
        departureTime: "08:15 from Mysuru",
        arrivalTime: "09:30 at Arsikere",
        duration: "Approximately 1 hour 15 minutes",
        note: "Connects areas near Tamil Nadu border."
      },
      {
        name: "Chennai Beach–Velachery Local (41541)",
        source: "Chennai Beach (MSB)",
        destination: "Velachery (VLCY)",
        startTime: "06:45",
        departureTime: "06:45 from Chennai Beach",
        arrivalTime: "07:10 at Velachery",
        duration: "Approximately 25 minutes",
        schedule: "Frequent suburban service in Chennai."
      }
    ];
    setTrainData(data);

    // Post data to backend
    fetch('http://localhost:5000/add-trains', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log('✅ Success:', res);
      })
      .catch((err) => {
        console.error('❌ Error:', err);
      });
  }, []);

  return (
    <div className="container">
      <h1>Train Schedule</h1>
      {/* Back to Admin Dashboard Button */}
      <button className="button-top-right" onClick={() => navigate('/admindashboard')}>
        Back to Admin Dashboard
      </button>
      <div className="train-list">
        {trainData.map((train, index) => (
          <div className="train-card" key={index}>
            {editIndex === index ? (
              <>
                <input
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                />
                <input
                  value={editForm.source}
                  onChange={(e) => setEditForm({ ...editForm, source: e.target.value })}
                />
                <input
                  value={editForm.destination}
                  onChange={(e) => setEditForm({ ...editForm, destination: e.target.value })}
                />
                <input
                  value={editForm.startTime}
                  onChange={(e) => setEditForm({ ...editForm, startTime: e.target.value })}
                />
                <input
                  value={editForm.departureTime}
                  onChange={(e) => setEditForm({ ...editForm, departureTime: e.target.value })}
                />
                <input
                  value={editForm.arrivalTime}
                  onChange={(e) => setEditForm({ ...editForm, arrivalTime: e.target.value })}
                />
                <input
                  value={editForm.duration}
                  onChange={(e) => setEditForm({ ...editForm, duration: e.target.value })}
                />
                {editForm.schedule !== undefined && (
                  <input
                    value={editForm.schedule}
                    onChange={(e) => setEditForm({ ...editForm, schedule: e.target.value })}
                  />
                )}
                {editForm.highlights !== undefined && (
                  <input
                    value={editForm.highlights}
                    onChange={(e) => setEditForm({ ...editForm, highlights: e.target.value })}
                  />
                )}
                {editForm.note !== undefined && (
                  <input
                    value={editForm.note}
                    onChange={(e) => setEditForm({ ...editForm, note: e.target.value })}
                  />
                )}
                <button onClick={() => {
                  const updated = [...trainData];
                  updated[index] = { ...updated[index], ...editForm };
                  setTrainData(updated);
                  setEditIndex(null);
                }}>Save</button>
                <button onClick={() => setEditIndex(null)}>Cancel</button>
              </>
            ) : (
              <>
                <strong>{train.name}</strong>
                <p><strong>Source:</strong> {train.source}</p>
                <p><strong>Destination:</strong> {train.destination}</p>
                <p><strong>Start Time:</strong> {train.startTime}</p>
                <p><strong>Departure Time:</strong> {train.departureTime}</p>
                <p><strong>Arrival Time:</strong> {train.arrivalTime}</p>
                <p><strong>Duration:</strong> {train.duration}</p>
                {train.schedule && <p><strong>Schedule:</strong> {train.schedule}</p>}
                {train.highlights && <p><strong>Highlights:</strong> {train.highlights}</p>}
                {train.note && <p><strong>Note:</strong> {train.note}</p>}
                <button onClick={() => {
                  setEditIndex(index);
                  setEditForm(train);
                }}>Edit</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
