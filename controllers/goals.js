const goalsRouter = require('express').Router()
const Goal = require('../models/goal')
const Table = require('../models/table')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

goalsRouter.get('/', async (request, response) => {
  try{

      const goals = await Goal.find({});
      return response.status(200).json(goals);

  } catch (exception) {
    console.error("Exception occured in goals get: ",exception)
  }
})

goalsRouter.get('/:id', async (request, response) => {
  try{

      const table = await Goal.findById(request.params.id);
      return response.status(200).json(table);

  } catch (exception) {
    console.error("Exception occured in goals get id: ",exception)
  }
})

goalsRouter.post('/', async (request, response) => {

  try{

    const decodedToken = jwt.verify(request.token, config.SECRET)

    if (!request.token || !decodedToken.id){
      return response.status(401).json({'error':'token missing or invalid'})
    }

    const user = await User.findById(decodedToken.id)
    const table = await Table.findById(request.body.parentTable)

    const goal = new Goal(request.body)
    goal.author = user.id

    const savedGoal = await goal.save()

    table.goals = table.goals.concat(savedGoal._id)
    await table.save()

    return response.status(201).json(savedGoal)
  } catch (exception) {
    console.error("Exception occured in goal post: ", exception)
  }
})

goalsRouter.delete('/:id', async (request, response) => {
  // Currently allowing any logged in user to delete a goal
  // Need to modify API end point structure to only allow particular users access to a resource
  // Or research better structure
  try{

    const decodedToken = jwt.verify(request.token, config.SECRET)

    if (!request.token || !decodedToken.id){
      return response.status(401).json({'error':'token missing or invalid'})
    }

    goal = await Goal.findById(request.params.id)

    parentTable = await Table.findById(goal.parentTable)

    goalIndex = parentTable.goals.indexOf(request.params.id)

    parentTable.goals.splice(goalIndex, 1)

    await parentTable.save()
    await Goal.findByIdAndRemove(request.params.id)

    return response.status(204).json({'Success': 'successfully deleted'})

  } catch (exception) {
    console.error("Exception occured in goal delete backend: ", exception)
  }
})

module.exports = goalsRouter
