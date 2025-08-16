const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Admin Schema
const adminSchema = new Schema({
  username: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
});

// Check if the model is already defined to avoid overwriting
const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

module.exports = Admin;
