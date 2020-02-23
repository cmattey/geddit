const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const goalSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User
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
    required: true
  },
  goalSpan: {
      type: String,
      required: true
  },
})

goalSchema.plugin(uniqueValidator)

const Goal = mongoose.model('Goal', goalSchema)

module.exports = Goal
