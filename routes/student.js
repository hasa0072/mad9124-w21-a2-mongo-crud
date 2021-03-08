

const express = require('express')
const Student = require('../models/Student')

const sanitizeBody = require('../middleware/sanitizeBody')

const router = express.Router()

function sendResourceNotFound(req, res) {
  res.status(404).send({
    errors: [
      {
        status: '404',
        title: 'Resource does not exist',
        description: `We could not find a student with id: ${req.params.id}`
      }
    ]
  })
}

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
    res.status(503).send({
      errors: [
        {
          status: '503',
          title: 'Service Unavailable',
          description: `The server cannot handle the request`
        }
      ]
    })
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
    sendResourceNotFound(req, res)
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

