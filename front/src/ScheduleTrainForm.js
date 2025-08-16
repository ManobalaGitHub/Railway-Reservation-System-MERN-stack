import React, { useState } from "react";
import "./ScheduleTrainForm.css";

const ScheduleTrainForm = () => {
  const [formData, setFormData] = useState({
    trainName: "",
    source: "",
    destination: "",
    startTime: "",
    departureTime: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:5008/api/trains", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Train scheduled successfully!");
        setFormData({
          trainName: "",
          source: "",
          destination: "",
          startTime: "",
          departureTime: "",
        });
      } else {
        setMessage(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error details:", error);
      setMessage("❌ Error connecting to server.");
    }
  };

  return (
    <div className="schedule-form-container">
      <h2>🚆 Railway Schedule</h2>
      <p>Fill in the details to schedule a new train on the railway timetable.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="trainName">Train Name:</label>
          <input
            type="text"
            name="trainName"
            id="trainName"
            placeholder="e.g., Express Train 101"
            value={formData.trainName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="source">Source Station:</label>
          <input
            type="text"
            name="source"
            id="source"
            placeholder="e.g., New York Central"
            value={formData.source}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="destination">Destination Station:</label>
          <input
            type="text"
            name="destination"
            id="destination"
            placeholder="e.g., Boston North"
            value={formData.destination}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="startTime">Start Time (Boarding):</label>
          <input
            type="time"
            name="startTime"
            id="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="departureTime">Departure Time:</label>
          <input
            type="time"
            name="departureTime"
            id="departureTime"
            value={formData.departureTime}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <button type="submit">Schedule Train</button>
        </div>
      </form>

      <p>{message}</p>
    </div>
  );
};

export default ScheduleTrainForm;
