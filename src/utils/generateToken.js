const jwt = require('jsonwebtoken')

const generateToken = (userId) => {
  const secret = process.env.SECRET_JWT
  if (!secret) {
    throw new Error('JWT secret (SECRET_JWT) is not configured')
  }

  if (userId == null) {
    throw new Error('Invalid userId: must be provided')
  }

  if (typeof userId !== 'string' && typeof userId !== 'number') {
    throw new Error('userId must be a string or number')
  }

  const expiresIn = process.env.JWT_EXPIRES_IN || '7d'
  return jwt.sign({ id: String(userId) }, secret, { expiresIn })
}

module.exports = generateToken
