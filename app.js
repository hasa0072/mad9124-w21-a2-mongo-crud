'use strict'

const mongoose = require('mongoose')
const sanitizeMongo = require('express-mongo-sanitize')

const morgan = require('morgan')
const express = require('express')

require('./startup/database')()

const app = express()
// configure express middleware
app.use(express.json())
app.use(morgan('tiny'));
app.use(sanitizeMongo())
app.use('/api/students', require('./routes/student'))
app.use('/api/courses', require('./routes/course'))

// start listening for HTTP requests
const port = process.env.port || 3030
app.listen(port, () => console.log(`Server listening on port ${port} ...`))
