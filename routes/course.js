

const express = require('express')
const router = express.Router()
const {validateCourseId,
       validateCourseData} = require('../middleware/validateCourse')

const sanitizeBody = require('./middleware/sanitizeBody')

const {courses} = require('../data/courses')

// use middleware for requests with course id
router.use('/:courseId', validateCourseId, validateCourseData)

// get all courses
router.get('/', (req, res) => res.send({data: courses}))

// get course with id
router.get('/:courseId', (req, res) => {
  res.send({data: courses[req.courseIndex]})
})

// create a new course
router.post('/', (req, res) => {
  const {code, title, description, url} = req.body
  const newCourse = {
    id: Date.now(),
    code,
    title,
    description,
    url
  }
  courses.push(newCourse)
  res.status(201).send({data: newCourse})
})


// update specified course
router.put('/:courseId', (req, res) => {
  const id = parseInt(req.params.courseId)
  const {code, title, description, url} = req.body
  const updatedCourse = {id, code, title, description, url}
  courses[req.courseIndex] = updatedCourse
  res.send({data: updatedcourse})
})

router.patch('/:courseId', (req, res) => {
  const {id, ...theRest} = req.body
  const updatedCourse = Object.assign({}, courses[req.courseIndex], theRest)
  courses[req.courseIndex] = updatedCourse
  res.send({data: updatedCourse})
})

router.delete('/:courseId', (req, res) => {
  const id = parseInt(req.params.courseId)
  // splice returns an array of the removed items
  const deletedCourses = courses.splice(req.courseIndex, 1)
  res.send({data: deletedCourses[0]})
})

module.exports = router

