const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const tableSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 3,
    required: true,
  },
  goals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Goal'
    }
  ],
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
})

tableSchema.plugin(uniqueValidator)

const Table = mongoose.model('Table', tableSchema)

module.exports = Table
