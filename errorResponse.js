

function sendResourceNotFound(req, res) {
  res.status(404).send({
    errors: [
      {
        status: '404',
        title: 'Resource does not exist',
        description: `We could not find a course with id: ${req.params.id}`
      }
    ]
  })
}

function sendValidationFailed(req, res, message) {
  res.status(400).send({
    errors: [
      {
        status: '400',
        title: 'Bad Request',
        description: `Request is missing one or more required fields: "${message}"`
      }
    ]
  })
}

function sendServiceUnavailable(req, res) {
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

module.exports =
  {
    sendResourceNotFound,
    sendValidationFailed,
    sendServiceUnavailable
  }

