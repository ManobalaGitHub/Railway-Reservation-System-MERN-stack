// seed.js
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/railway", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = mongoose.model("User", new mongoose.Schema({
  username: String,
  password: String,
}));

User.create({
  username: "testuser",
  password: "123456"
}).then(() => {
  console.log("✅ User added!");
  mongoose.disconnect();
});
