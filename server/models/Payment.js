const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  paymentId: { type: String, required: true, unique: true },
  ticketId: { type: mongoose.Schema.Types.ObjectId, ref: "BookingForm", required: true },
  amount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Failed"],
    required: true
  }
});

module.exports = mongoose.model("Payment", paymentSchema);
