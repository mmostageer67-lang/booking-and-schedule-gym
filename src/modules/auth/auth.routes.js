const express = require('express')
const rateLimit = require('express-rate-limit')
const router = express.Router()
const { registerController, loginController } = require('./auth.controller')
const protect = require('../../middleware/auth.middleware')
const authorizeRole = require('../../middleware/role.middleware')
const { validate } = require('../../middleware/validate.middleware')
const { registerSchema, loginSchema } = require('./auth.validation')

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: "Too many login attempts. Try again later." }
})

router.post('/register', protect, authorizeRole('admin', 'super_admin'), validate(registerSchema), registerController)
router.post('/login', loginLimiter, validate(loginSchema), loginController)

module.exports = router
