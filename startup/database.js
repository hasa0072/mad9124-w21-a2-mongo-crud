'use strict'

const mongoose = require('mongoose')

module.exports = () =>
  mongoose
    .connect('mongodb://localhost:27017/mad9124', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
    .then(() => console.log('Connected to MongoDB ...'))
    .catch(err => {
      console.error('Problem connecting to MongoDB ...', err.message)
      process.exit(1)
    })

