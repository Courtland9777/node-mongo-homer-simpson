const mongoose = require('mongoose')
const Schema = mongoose.Schema

const nameSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'Missing required field: firstName'],
    minLength: [1, 'Missing required field: firstName']
  },
  lastName: {
    type: String,
    required: [true, 'Missing required field: lastName'],
    minLength: [1, 'Missing required field: lastName']
  }
})

module.exports = mongoose.model('Names', nameSchema)
