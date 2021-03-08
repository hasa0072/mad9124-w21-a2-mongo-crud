'use strict'

const mongoose = require('mongoose')
const sanitizeMongo = require('express-mongo-sanitize')

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

const morgan = require('morgan')
const express = require('express')
const app = express()
// configure express middleware
app.use(express.json())
app.use(sanitizeMongo())
app.use('/api/students', require('./routes/student'))
app.use('/api/courses', require('./routes/course'))

// start listening for HTTP requests
const port = process.env.port || 3030
app.listen(port, () => console.log(`Server listening on port ${port} ...`))
