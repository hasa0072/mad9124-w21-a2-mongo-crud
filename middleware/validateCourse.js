
const {courses} = require('../data/courses')

const validateCourseId = (req, res, next) => {
  const id = parseInt(req.params.courseId)
  const index = courses.findIndex(course => course.id === id)

  if (index < 0) {
    res.status(404).send({
      errors: [
        {
          status: '404',
          title: 'Resource does not exist',
          description: `We could not find a course with id: ${id}`
        }
      ]
    })
  } else {
    req.courseIndex = index
    next()
  }
}

const validateCourseData = (req, res, next) => {
  const course = courses[req.courseIndex]
  for (const key in req.body) {
    if (!(key in course)) {
      //https://stackoverflow.com/questions/6123425/rest-response-code-for-invalid-data
      res.status(422).send({
        errors: [
          {
            status: '422',
            title: 'Cannot Process Data',
            description: `One or more property names are invalid: ${key} does not exist`
          }
        ]
      })
      return
    }
  }
  next()
}

module.exports = {validateCourseId, validateCourseData}

