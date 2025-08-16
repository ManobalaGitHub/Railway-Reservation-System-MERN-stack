const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  name: { type: String, required: true },               // Passenger name
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  coachType: { type: String, required: true },
  trainName: { type: String },                          // Optional: Add this if needed
  totalTickets: { type: Number, default: 1 },           // Default to 1 ticket per booking
  remainingTickets: { type: Number, default: 0 }        // Can be managed separately
});

module.exports = mongoose.model('Ticket', ticketSchema);
