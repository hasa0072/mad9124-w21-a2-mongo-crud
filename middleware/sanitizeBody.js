
const xss = require('xss')
const debug = require('debug')(':body')

const stripTags = payload => {
  let attributes = {...payload}
  for (let key in attributes) {
    attributes[key] = xss(attributes[key], {
      whiteList: [],
      stripIgnoreTag: true,
      stripIgnoreTagBody: ['script']
    })
  }
  return attributes
}

module.exports = (req, res, next) => {
  debug({body: req.body})
  const {id, _id, ...attributes} = req.body
  debug({attributes})
  const sanitizedBody = stripTags(attributes)
  debug({sanitizedBody: sanitizedBody})
  req.sanitizedBody = sanitizedBody
  next()
}
