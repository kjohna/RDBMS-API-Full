// manage cohorts, students API, persist data to SQLite3
const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile');

const db = knex(knexConfig);
const errors = {
  '19': 'Another record with that value exists'
}

const server = express();

server.use(helmet());
server.use(express.json());

// make sure it's working..
server.get('', (req, res) => {
  res.status(200).json({ message: "Server says hi." });
});

// routes for cohorts
// GET all cohorts in db
server.get('/api/cohorts', async (req, res) => {
  try {
    const cohorts = await db('cohorts');
    res.status(200).json(cohorts);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET cohorts by id
server.get('/api/cohorts/:id', async (req, res) => {
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
server.get('/api/cohorts/:id/students', async (req, res) => {
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
server.post('/api/cohorts', async (req, res) => {
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
server.put('/api/cohorts/:id', async (req, res) => {
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
server.delete('/api/cohorts/:id', async (req, res) => {
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

const port = process.env.PORT || 3030;

server.listen(port, () => console.log(`\n running on ${port}\n`));