// Login.js
import React, { useState, useEffect } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [allUsers, setAllUsers] = useState([]);

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUserInfo(data);
        fetchUsers(); // Refresh user list
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server connection failed.");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:3000/users");
      const users = await res.json();
      setAllUsers(users);
    } catch (err) {
      console.error("Fetching users failed", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login / Register</h2>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      /><br /><br />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      /><br /><br />
      <button onClick={handleLogin}>Submit</button>

      {userInfo && (
        <div style={{ marginTop: "20px" }}>
          <h3>Welcome, {userInfo.username}</h3>
          <p>Email: {userInfo.email}</p>
        </div>
      )}

      <h3 style={{ marginTop: "40px" }}>All Users in DB</h3>
      <ul>
        {allUsers.map((user, i) => (
          <li key={i}>
            {user.username} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Login;
