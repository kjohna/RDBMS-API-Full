// manage cohorts, students API, persist data to SQLite3
const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = './knexfile.js';

const db = knex(knexConfig);

const server = express();

server.use(helmet());
server.use(express.json());

// make sure it's working..
server.get('', (req, res) => {
  res.status(200).json({ message: "Server says hi." });
});

const port = process.env.PORT || 3030;

server.listen(port, () => console.log(`\n running on ${port}\n`));