const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  nickName: String,
  email: String,
})

module.exports = mongoose.model('Student', schema)

