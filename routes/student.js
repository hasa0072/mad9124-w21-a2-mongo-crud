

const express = require('express')
const Student = require('../models/Student')

const sanitizeBody = require('../middleware/sanitizeBody')

const router = express.Router()

const {
  sendResourceNotFound,
  sendValidationFailed,
  sendServiceUnavailable
} = require('../errorResponse')

// get all students
router.get('/', async (req, res) => {
  const students = await Student.find()
  res.send({data: students})
})

// get student with id
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
    if (!student) {
      throw new Error('Resource not found')
    }
    res.send({data: student})
  } catch (err) {
    /* handle error */
    sendResourceNotFound(req, res);
  }
})

// create a new student
router.post('/', sanitizeBody, async (req, res) => {
  try {
    const newStudent = new Student(req.sanitizedBody)
    await newStudent.save()
    res.status(201).send({data: newStudent})
  } catch(err) {
    // https://mongoosejs.com/docs/api/error.html#error_Error-ValidationError
    if (err instanceof mongoose.Error.ValidationError) {
      sendValidationFailed(req, res, err.message)
    } else {
      sendServiceUnavailable(req, res)
    }
  }
})


// update specified student
router.put('/:id', sanitizeBody, async (req, res) => {
  try {
    const {_id, ...otherAttributes} = req.body
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      {_id: req.params.id, ...otherAttributes},
      {
        new: true,
        overwrite: true,
        runValidators: true
      }
    )
    if (!student) throw new Error('Resource not found')
    res.send({data: student})
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      sendValidationFailed(req, res, err.message)
    } else {
      sendServiceUnavailable(req, res)
    }
  }
})

router.patch('/:id', sanitizeBody, async (req, res) => {
  try {
    const {_id, ...otherAttributes} = req.body
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      {_id: req.params.id, ...otherAttributes},
      {
        new: true,
        runValidators: true
      }
    )
    if (!student) throw new Error('Resource not found')
    res.send({data: student})
  } catch (err) {
    sendResourceNotFound(req, res)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndRemove(req.params.id)
    if (!student) throw new Error('Resource not found')
    res.send({data: student})
  } catch (err) {
    sendResourceNotFound(req, res)
  }
})

module.exports = router

