const express = require('express');
const config = require('./utils/config')
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const tablesRouter = require('./controllers/tables')
const goalsRouter = require('./controllers/goals')
const middleware = require('./utils/middleware')

console.log('connecting to db')

mongoose.connect(config.MONGODB_URI, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.error('error connecting to MongoDB: ', error.message);
  })

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('frontend/build'))

app.use(middleware.tokenExtractor)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/tables', tablesRouter)
app.use('/api/goals', goalsRouter)

app.get('/api', (request, response) => {
  response.status(200).json({"Message": "Success API"})
})

module.exports = app;
