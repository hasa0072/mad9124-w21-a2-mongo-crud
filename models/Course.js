const mongoose = require('mongoose')
const Student = require('./Student')

const schema = new mongoose.Schema({
  code: String,
  title: String,
  description: String,
  url: String,
  students: [Student],
})


