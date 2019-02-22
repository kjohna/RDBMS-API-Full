// manage cohorts, students API, persist data to SQLite3
const express = require('express');
const helmet = require('helmet');

const cohortsRouter = require('./routers/cohorts-router.js');
const studentsRouter = require('./routers/students-router.js');

const server = express();

server.use(helmet());
server.use(express.json());

// routes here
server.use('/api/cohorts', cohortsRouter); // cohorts routes handler
server.use('/api/students', studentsRouter); // students routes


// make sure it's working..
server.get('', (req, res) => {
  res.status(200).json({ message: "Server says hi." });
});

const port = process.env.PORT || 3030;

server.listen(port, () => console.log(`\n running on ${port}\n`));