const errorMiddleware = (err, req, res, next) => {
  console.error(err)

  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern || {})[0] || 'field'
    return res.status(409).json({
      success: false,
      message: `${field} already exists`
    })
  }

  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid token"
    })
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Token expired"
    })
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID format'
    })
  }

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => ({ field: e.path, message: e.message }))
    return res.status(400).json({
      success: false,
      errors
    })
  }

  const status = err.status || 500
  const message = status === 500
    ? (process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message)
    : err.message

  return res.status(status).json({
    success: false,
    message
  })
}

module.exports = errorMiddleware
