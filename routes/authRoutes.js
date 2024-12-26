const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User1 = require("../models/User");
const Course = require("../models/Course");

const router = express.Router();

// Register
router.post("/signup", async (req, res) => {
  const { username, email, password, role} = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User1({ username, email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials!" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/createCourse', async (req, res) => {
    const { title, description, schedule } = req.body;
  
    try {
      const newCourse = new Course({ title, description, schedule });
      await newCourse.save();
      res.status(201).json({ message: 'Course created successfully!', course: newCourse });
    } catch (error) {
      res.status(500).json({ error: 'Error creating course: ' + error.message });
    }
  });

  // Route to fetch all courses
router.get('/getCourses', async (req, res) => {
    try {
      const courses = await Course.find();
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching courses: ' + error.message });
    }
  });

module.exports = router;


