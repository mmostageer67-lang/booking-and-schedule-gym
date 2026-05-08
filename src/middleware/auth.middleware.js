const jwt = require('jsonwebtoken')
const User = require('../modules/users/user.model')

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      })
    }

    const token = authHeader.split(' ')[1]

    try {
      const decoded = jwt.verify(token, process.env.SECRET_JWT)

      const user = await User.findById(decoded.id).select('name email role')
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User not found'
        })
      }

      req.user = user
      return next()
    } catch (jwtError) {
      if (jwtError.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: "Token expired"
        })
      }
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      })
    }
  } catch (error) {
    return next(error)
  }
}

module.exports = protect
