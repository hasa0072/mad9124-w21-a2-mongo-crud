const mongoose = require('mongoose')
const Student = require('./Student')

const schema = new mongoose.Schema({
  code: String,
  title: String,
  description: String,
  url: String,
  students: [{type: mongoose.Schema.Types.ObjectId, ref: 'Student'}]
})

module.exports = mongoose.model('Course', schema)

