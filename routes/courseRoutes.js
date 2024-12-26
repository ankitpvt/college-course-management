const express = require("express");
const router = express.Router();

// Mock data for demonstration
let courses = [
  { id: 1, name: "React Basics", description: "Learn React from scratch" },
  { id: 2, name: "Node.js Fundamentals", description: "Master backend with Node.js" },
];

// Get all courses
router.get("/", (req, res) => {
  res.status(200).json(courses);
});

// Get a specific course by ID
router.get("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).json({ message: "Course not found" });
  res.status(200).json(course);
});

// Add a new course
router.post("/", (req, res) => {
  const { name, description } = req.body;
  if (!name || !description)
    return res.status(400).json({ message: "Name and description are required" });

  const newCourse = {
    id: courses.length + 1,
    name,
    description,
  };

  courses.push(newCourse);
  res.status(201).json(newCourse);
});

// Update a course by ID
router.put("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).json({ message: "Course not found" });

  const { name, description } = req.body;
  course.name = name || course.name;
  course.description = description || course.description;

  res.status(200).json(course);
});

// Delete a course by ID
router.delete("/:id", (req, res) => {
  const courseIndex = courses.findIndex((c) => c.id === parseInt(req.params.id));
  if (courseIndex === -1) return res.status(404).json({ message: "Course not found" });

  courses.splice(courseIndex, 1);
  res.status(200).json({ message: "Course deleted successfully" });
});

module.exports = router;
