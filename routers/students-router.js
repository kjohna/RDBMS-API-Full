// routes for students
// students-router responds to requests to '/api/students' see index.js
const express = require('express');
const router = express.Router();
const knex = require('knex');

const knexConfig = require('../knexfile');

const db = knex(knexConfig.development);
const errors = {
  '19': 'Another record with that value exists'
}

// GET all students in db
router.get('/', async (req, res) => {
  try {
    const students = await db('students');
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET students by id
router.get('/:id', async (req, res) => {
  const studentId = req.params.id;
  try {
    const student = await db('students')
      .where({ id: studentId })
      .first();
      if (student) {
        res.status(200).json(student);
      } else {
        res.status(404).json({ message: `Could not find student with id: ${studentId}` });
      }
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET students corresponding to student id
router.get('/:id/students', async (req, res) => {
  const studentId = req.params.id;
  try {
    const student = await db('students')
      .where({ id: studentId })
      .first();
      if (student) {
        const students = await db('students')
          .where({ student_id: studentId });
        res.status(200).json(students);
      } else {
        res.status(404).json({ message: `Could not find student with id: ${studentId}` });
      }
  } catch (error) {
    res.status(500).json(error);
  }
});

// POST new student
router.post('/', async (req, res) => {
  try {
    const [id] = await db('students').insert(req.body);
    const newstudent = await db('students')
      .where({ id: id })
      .first();
    res.status(201).json(newstudent)
  } catch (error) {
    const msg = errors[error.errno] || error;
    res.status(500).json({ message: msg });
  }
});

// PUT update student by id
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const numUpdated = await db('students')
      .where({ id: id })
      .update(req.body);
    if (numUpdated > 0 ) {
      const updatedItem = await db('students')
        .where({ id: id })
        .first();
      res.status(200).json(updatedItem);
    } else {
      res.status(404).json({ message: `No student with id: ${id} was found!`});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE student by id
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const numDeleted = await db('students')
      .where({ id: id })
      .del();
    if (numDeleted > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: `No student with id: ${id} was found!`});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;