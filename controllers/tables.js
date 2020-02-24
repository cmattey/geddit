const tablesRouter = require('express').Router()
const Table = require('../models/table')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

tablesRouter.get('/', async (request, response) => {
  try{

      const tables = await Table.find({}).populate('goals', {title:1}).populate('users',{username:1})
      return response.status(200).json(tables)

  } catch (exception) {
    console.error("Exception occured in table get: ",exception)
  }
})

tablesRouter.get('/:id', async (request, response) => {
  try{

      const table = await Table.findById(request.params.id);
      return response.status(200).json(table);

  } catch (exception) {
    console.error("Exception occured in table get: ",exception)
  }
})

/*
Use this end-point for creating 1-user personal tables
Use the /api/tables/shared end-point for creating shared tables
*/
tablesRouter.post('/', async (request, response) => {

  try{

    const decodedToken = jwt.verify(request.token, config.SECRET)

    if (!request.token || !decodedToken.id){
      return response.status(401).json({'error':'token missing or invalid'})
    }

    const user = await User.findById(decodedToken.id)

    const table = new Table(request.body)
    table.users = table.users.concat(user.id)

    const savedTable = await table.save()

    user.personalTables = user.personalTables.concat(savedTable._id)
    await user.save()

    return response.status(201).json(savedTable)
  } catch (exception) {
    console.error("Exception occured in table post: ", exception)
  }
})

module.exports = tablesRouter
