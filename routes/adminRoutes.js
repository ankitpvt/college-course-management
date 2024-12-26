const express = require("express");
const router = express.Router();

// Mock admin data for demonstration
let admins = [
  { id: 1, username: "admin1", email: "admin1@example.com" },
  { id: 2, username: "admin2", email: "admin2@example.com" },
];

// Get all admins
router.get("/", (req, res) => {
  res.status(200).json(admins);
});

// Get a specific admin by ID
router.get("/:id", (req, res) => {
  const admin = admins.find((a) => a.id === parseInt(req.params.id));
  if (!admin) return res.status(404).json({ message: "Admin not found" });
  res.status(200).json(admin);
});

// Add a new admin
router.post("/", (req, res) => {
  const { username, email } = req.body;
  if (!username || !email)
    return res.status(400).json({ message: "Username and email are required" });

  const newAdmin = {
    id: admins.length + 1,
    username,
    email,
  };

  admins.push(newAdmin);
  res.status(201).json(newAdmin);
});

// Update admin by ID
router.put("/:id", (req, res) => {
  const admin = admins.find((a) => a.id === parseInt(req.params.id));
  if (!admin) return res.status(404).json({ message: "Admin not found" });

  const { username, email } = req.body;
  admin.username = username || admin.username;
  admin.email = email || admin.email;

  res.status(200).json(admin);
});

// Delete admin by ID
router.delete("/:id", (req, res) => {
  const adminIndex = admins.findIndex((a) => a.id === parseInt(req.params.id));
  if (adminIndex === -1) return res.status(404).json({ message: "Admin not found" });

  admins.splice(adminIndex, 1);
  res.status(200).json({ message: "Admin deleted successfully" });
});

module.exports = router;
