const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const usersRouter = require('./controllers/users')

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('frontend/build'))

app.use('/api/users', usersRouter);
// app.use('/api/login', loginRouter);
// app.use('/api/tables', tablesRouter);
// app.use('/api/goals', goalsRouter);

app.get('/api', (request, response) => {
  response.status(200).json({"Message": "Success API"})
})

module.exports = app;
