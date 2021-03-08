const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  code: String,
  title: String,
  description: String,
  url: String,
  students: [Number],
})

module.exports = mongoose.model('Course', schema)

