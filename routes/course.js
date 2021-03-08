
const debug = require('debug')('Router:Course:')
const express = require('express')
const Course = require('../models/Course')
const mongoose = require('mongoose')

const sanitizeBody = require('../middleware/sanitizeBody')
const router = express.Router()

const {
  sendResourceNotFound,
  sendValidationFailed,
  sendServiceUnavailable
} = require('../errorResponse')

// get all courses
router.get('/', async (req, res) => {
  debug("Received GET all")
  const courses = await Course.find()
  res.send({data: courses})
})

// get course with id
router.get('/:id', async (req, res) => {
  debug(`Received GET ${req.params.id}`)
  try {
    const course = await Course.findById(req.params.id)
    if (!course) {
      throw new Error('Resource not found')
    }
    res.send({data: course})
  } catch (err) {
    /* handle error */
    sendResourceNotFound(req, res);
  }
})

// create a new course
router.post('/', sanitizeBody, async (req, res) => {
  debug("Received POST")
  try {
    const newCourse = new Course(req.sanitizedBody)
    debug(`   ${newCourse}`)
    await newCourse.save()
    res.status(201).send({data: newCourse})
    debug("   Data saved")
  } catch(err) {
    // https://mongoosejs.com/docs/api/error.html#error_Error-ValidationError
    if (err instanceof mongoose.Error.ValidationError) {
      sendValidationFailed(req, res, err.message)
    } else {
      debug("   Something is wrong in POST")
      sendServiceUnavailable(req, res)
    }
  }
})


// update specified course
router.put('/:id', sanitizeBody, async (req, res) => {
  try {
    const {_id, ...otherAttributes} = req.sanitizedBody
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      {_id: req.params.id, ...otherAttributes},
      {
        new: true,
        overwrite: true,
        runValidators: true
      }
    )
    if (!course) throw new Error('Resource not found')
    res.send({data: course})
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      sendValidationFailed(req, res, err.message)
    } else {
      debug("   Something is wrong in PUT")
      sendServiceUnavailable(req, res)
    }
  }
})

router.patch('/:id', sanitizeBody, async (req, res) => {
  try {
    const {_id, ...otherAttributes} = req.body
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      {_id: req.params.id, ...otherAttributes},
      {
        new: true,
        runValidators: true
      }
    )
    if (!course) throw new Error('Resource not found')
    res.send({data: course})
  } catch (err) {
    sendResourceNotFound(req, res)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndRemove(req.params.id)
    if (!course) throw new Error('Resource not found')
    res.send({data: course})
  } catch (err) {
    sendResourceNotFound(req, res)
  }
})

module.exports = router

