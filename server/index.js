const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const User = require("./models/User");
const Booking = require("./models/BookingForm");
const Payment = require("./models/Payment");
const Admin = require("./models/admin");
const Ticket = require("./models/tickets");
const Train = require("./models/train");

const app = express();
const PORT = 5008;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb+srv://sankaramoorthysankaramoorthy0:mano123@cluster0.ion9gck.mongodb.net/train-booking", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

/* ------------------------ User Routes ------------------------ */

// Register User
app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) return res.status(400).json({ error: "Email and password are required." });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "✅ User registered successfully!" });
  } catch (err) {
    console.error("❌ Error during registration:", err);
    res.status(500).json({ error: "Registration failed" });
  }
});

// Login User
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) return res.status(400).json({ error: "Email and password required." });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    res.status(200).json({ message: "✅ Login successful", user: { email: user.email } });
  } catch (err) {
    console.error("❌ Error during login:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

/* ------------------------ Booking ------------------------ */
app.post("/api/bookings", async (req, res) => {
  const { name, age, gender, source, destination, date,time, coachType } = req.body;
  try {
    if (!name || !age || !gender || !source || !destination || !date ||!time|| !coachType) {
      return res.status(400).json({ error: "All booking fields are required" });
    }

    const newBooking = new Booking({ name, age, gender, source, destination, date,time, coachType });
    await newBooking.save();

    res.status(201).json({ message: "✅ Ticket booked successfully!", _id: newBooking._id });
  } catch (err) {
    console.error("❌ Error during booking:", err);
    res.status(500).json({ error: "Booking failed" });
  }
});

/* ------------------------ Payments ------------------------ */
app.post("/api/payment", async (req, res) => {
  const {
    paymentId,
    ticketId,
    amount,
    status,
    paymentMethod,
    transactionId,
    currency,
    paymentGateway,
  } = req.body;

  try {
    if (
      !paymentId ||
      !ticketId ||
      !amount ||
      !status ||
      !paymentMethod ||
      !transactionId ||
      !currency ||
      !paymentGateway
    ) {
      return res.status(400).json({ error: "Missing required payment details" });
    }

    // Check if ticket exists
    const ticket = await Booking.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    const newPayment = new Payment({
      paymentId,
      ticketId,
      amount,
      status,
      paymentMethod,
      transactionId,
      currency,
      paymentGateway,
      createdAt: new Date(),
    });

    await newPayment.save();
    res.status(201).json({ message: "✅ Payment recorded successfully!" });
  } catch (err) {
    console.error("❌ Error during payment processing:", err);
    res.status(500).json({ error: "Payment failed" });
  }
});


/* ------------------------ Admin Routes ------------------------ */
app.post("/api/admin/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields required" });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json({ error: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ username, email, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ admin: { id: newAdmin._id, username: newAdmin.username, email: newAdmin.email } });
  } catch (err) {
    console.error("❌ Error during admin registration:", err);
    res.status(500).json({ error: "Registration failed" });
  }
});

app.post("/api/admin/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ error: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    res.status(200).json({ message: "✅ Admin login successful", admin: { id: admin._id, username: admin.username, email: admin.email } });
  } catch (err) {
    console.error("❌ Error during admin login:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

/* ------------------------ Ticket Management ------------------------ */

app.get("/api/tickets", async (req, res) => {
  try {
    const tickets = await Booking.find();
    res.status(200).json(tickets);
  } catch (err) {
    console.error("❌ Error fetching tickets:", err);
    res.status(500).json({ error: "Failed to fetch tickets" });
  }
});

app.put("/api/tickets/:ticketId", async (req, res) => {
  const { ticketId } = req.params;
  const { remainingTickets } = req.body;

  try {
    const updatedTicket = await Booking.findByIdAndUpdate(
      ticketId,
      { remainingTickets },
      { new: true }
    );

    if (!updatedTicket) return res.status(404).json({ error: "Ticket not found" });

    res.status(200).json({ message: "✅ Ticket updated successfully", ticket: updatedTicket });
  } catch (err) {
    console.error("❌ Error updating ticket:", err);
    res.status(500).json({ error: "Failed to update ticket" });
  }
});

app.delete("/api/tickets/:ticketId", async (req, res) => {
  const { ticketId } = req.params;

  try {
    const deletedTicket = await Booking.findByIdAndDelete(ticketId);
    if (!deletedTicket) return res.status(404).json({ error: "Ticket not found" });

    res.status(200).json({ message: "✅ Ticket deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting ticket:", err);
    res.status(500).json({ error: "Failed to delete ticket" });
  }
});

/* ------------------------ Train Scheduling ------------------------ */

app.post("/api/trains", async (req, res) => {
  const { trainName, source, destination, startTime, departureTime } = req.body;

  if (!trainName || !source || !destination || !startTime || !departureTime) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newTrain = new Train({
      trainName,
      source,
      destination,
      startTime,
      departureTime,
    });

    await newTrain.save();
    res.status(201).json({ message: "Train scheduled successfully!" });
  } catch (err) {
    console.error("❌ Error scheduling train:", err);
    res.status(500).json({ message: "Failed to schedule train" });
  }
});

/* ------------------------ Start Server ------------------------ */
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
