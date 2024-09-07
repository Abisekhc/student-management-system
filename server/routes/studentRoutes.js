const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all students
router.get('/', (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Add a new student
router.post('/', (req, res) => {
  const { firstname, lastname, location, email, dob, education } = req.body;
  db.query('INSERT INTO students (firstname, lastname, location, email, dob, education) VALUES (?, ?, ?, ?, ?, ?)',
    [firstname, lastname, location, email, dob, education], (err, result) => {
      if (err) throw err;
      res.status(201).json({ id: result.insertId, firstname, lastname, location, email, dob, education });
    });
});

// Get a single student
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM students WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

// Update a student
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, location, email, dob, education } = req.body;
  db.query('UPDATE students SET firstname = ?, lastname = ?, location = ?, email = ?, dob = ?, education = ? WHERE id = ?',
    [firstname, lastname, location, email, dob, education, id], (err) => {
      if (err) throw err;
      res.sendStatus(200);
    });
});

// Delete a student
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM students WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});

module.exports = router;
