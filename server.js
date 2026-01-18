const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

// Middleware to parse JSON body
app.use(express.json());

// Serve static files from 'public'
app.use(express.static("public"));

// Simple in-memory "database" (for testing)
const users = [];

// ---------------- SIGNUP ----------------
app.post("/api/auth/signup", async (req, res) => {
  const { email, password } = req.body;

  if (users.find(user => user.email === email)) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword });

  res.json({ message: "Signup successful!" });
});

// ---------------- LOGIN ----------------
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(user => user.email === email);
  if (!user) return res.status(400).json({ message: "Invalid email or password" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid email or password" });

  res.json({ message: "Login successful!" });
});

// ---------------- START SERVER ----------------
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
