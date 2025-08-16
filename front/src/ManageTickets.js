import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ManageTicket = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('http://localhost:5008/api/tickets');
        const data = await response.json();
        setTickets(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch tickets');
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const handleDelete = async (ticketId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this ticket?');
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:5008/api/tickets/${ticketId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setTickets(tickets.filter((ticket) => ticket._id !== ticketId));
          alert('Ticket deleted successfully');
        } else {
          alert('Failed to delete ticket');
        }
      } catch (err) {
        alert('Error deleting ticket');
      }
    }
  };

  const filteredTickets = tickets.filter((ticket) =>
    [ticket.source, ticket.destination]
      .some(field => field.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: '30px', maxWidth: '1000px', margin: 'auto', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <h2 style={{ marginBottom: '20px', color: '#1976d2' }}>🎟️ Manage Tickets</h2>

      <input
        type="text"
        placeholder="🔍 Search by source or destination..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          marginBottom: '20px',
          padding: '10px',
          width: '100%',
          borderRadius: '6px',
          border: '1px solid #ccc'
        }}
      />

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
        <thead>
          <tr style={{ backgroundColor: '#1976d2', color: 'white' }}>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Age</th>
            <th style={thStyle}>Gender</th>
            <th style={thStyle}>Source</th>
            <th style={thStyle}>Destination</th>
            <th style={thStyle}>Date</th>
            <th style={thStyle}>Coach</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTickets.map((ticket) => (
            <tr key={ticket._id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={tdStyle}>{ticket.name}</td>
              <td style={tdStyle}>{ticket.age}</td>
              <td style={tdStyle}>{ticket.gender}</td>
              <td style={tdStyle}>{ticket.source}</td>
              <td style={tdStyle}>{ticket.destination}</td>
              <td style={tdStyle}>{new Date(ticket.date).toLocaleDateString()}</td>
              <td style={tdStyle}>{ticket.coachType}</td>
              <td style={tdStyle}>
                <button
                  onClick={() => handleDelete(ticket._id)}
                  style={deleteBtnStyle}
                >
                  ❌ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={() => navigate('/admindashboard')}
        style={{
          marginTop: '30px',
          padding: '12px 20px',
          backgroundColor: '#1976d2',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        ⬅️ Back to Admin Dashboard
      </button>
    </div>
  );
};

const thStyle = {
  padding: '12px',
  textAlign: 'left'
};

const tdStyle = {
  padding: '12px',
  textAlign: 'left'
};

const deleteBtnStyle = {
  backgroundColor: '#e53935',
  color: '#fff',
  border: 'none',
  padding: '6px 10px',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default ManageTicket;
