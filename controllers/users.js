const usersRouter = require('express').Router();
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  try {

    const users = await User.find({});
    return response.json(users.map(u => u.toJSON()));

  } catch (exception){
    console.error("Exception occured at users get", exception)
  }
})

usersRouter.get('/:id', async (request, response) => {
  try{

    const user = await User.findById(request.params.id)
    return response.status(200).json(user)

  } catch (exception){
    console.error("Exception occured at user/id get", exception)
  }
})

usersRouter.post('/', async(request, response) => {
  try{

    const body = request.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username : body.username,
      name : body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    return response.status(201).json(savedUser)


  } catch (exception){
    console.error("Exception occured at users post", exception)
  }
})

module.exports = usersRouter;
