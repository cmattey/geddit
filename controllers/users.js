const usersRouter = require('express').Router();
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  try {
    return response.json({"Message": "Success Users"})
  } catch (exception){
    console.error("Exception occured at users get", exception)
  }
})

module.exports = usersRouter;
