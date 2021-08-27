const mongoose = require('mongoose')
const Schema = mongoose.Schema

const nameSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'Missing required field: {VALUE}'],
    minLength: 1
  },
  lastName: {
    type: String,
    required: [true, 'Missing required field: {VALUE}'],
    minLength: 1
  }
})

module.exports = mongoose.model('Names', nameSchema)
