const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const tableSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 3,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now
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

tableSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

tableSchema.plugin(uniqueValidator)

const Table = mongoose.model('Table', tableSchema)

module.exports = Table
