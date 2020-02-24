const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const goalSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    minlength: 3,
    required: true,
  },
  description: {
    type: String,
  },
  isAchieved: {
    type: Boolean,
    required: true,
    default: false,
  },
  goalSpan: {
      type: String,
  },
  parentTable: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Table'
  }
})

goalSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

goalSchema.plugin(uniqueValidator)

const Goal = mongoose.model('Goal', goalSchema)

module.exports = Goal
