// routes for cohorts
// cohorts-router responds to requests to '/api/cohorts' see index.js
const express = require('express');
const router = express.Router();
const knex = require('knex');

const knexConfig = require('../knexfile');

const db = knex(knexConfig.development);
const errors = {
  '19': 'Another record with that value exists'
}

// GET all cohorts in db
router.get('/', async (req, res) => {
  try {
    const cohorts = await db('cohorts');
    res.status(200).json(cohorts);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET cohorts by id
router.get('/:id', async (req, res) => {
  const cohortId = req.params.id;
  try {
    const cohort = await db('cohorts')
      .where({ id: cohortId })
      .first();
      if (cohort) {
        res.status(200).json(cohort);
      } else {
        res.status(404).json({ message: `Could not find cohort with id: ${cohortId}` });
      }
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET students corresponding to cohort id
router.get('/:id/students', async (req, res) => {
  const cohortId = req.params.id;
  try {
    const cohort = await db('cohorts')
      .where({ id: cohortId })
      .first();
      if (cohort) {
        const students = await db('students')
          .where({ cohort_id: cohortId });
        res.status(200).json(students);
      } else {
        res.status(404).json({ message: `Could not find cohort with id: ${cohortId}` });
      }
  } catch (error) {
    res.status(500).json(error);
  }
});

// POST new cohort
router.post('/', async (req, res) => {
  try {
    const [id] = await db('cohorts').insert(req.body);
    const newCohort = await db('cohorts')
      .where({ id: id })
      .first();
    res.status(201).json(newCohort)
  } catch (error) {
    const msg = errors[error.errno] || error;
    res.status(500).json({ message: msg });
  }
});

// PUT update cohort by id
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const numUpdated = await db('cohorts')
      .where({ id: id })
      .update(req.body);
    if (numUpdated > 0 ) {
      const updatedItem = await db('cohorts')
        .where({ id: id })
        .first();
      res.status(200).json(updatedItem);
    } else {
      res.status(404).json({ message: `No cohort with id: ${id} was found!`});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE cohort by id
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const numDeleted = await db('cohorts')
      .where({ id: id })
      .del();
    if (numDeleted > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: `No cohort with id: ${id} was found!`});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;