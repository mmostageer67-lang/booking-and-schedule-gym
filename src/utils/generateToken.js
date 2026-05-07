const jwt = require('jsonwebtoken')

const generateToken = (userId) => {
  const secret = process.env.SECRET_JWT
  if (!secret) {
    throw new Error('JWT secret (SECRET_JWT) is not configured')
  }
  if (userId == null) {
    throw new Error('Invalid userId: must be provided')
  }
  const expiresIn = process.env.JWT_EXPIRES_IN || '30d'
  return jwt.sign({ id: userId.toString() }, secret, { expiresIn })
}

module.exports = generateToken
