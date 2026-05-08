const router = require('express').Router()
const protect = require('../../middleware/auth.middleware')
const authorizeRole = require('../../middleware/role.middleware')
const { validate } = require('../../middleware/validate.middleware')
const { createBookingSchema } = require('./booking.validation')
const { createBookingController, cancelBookingController, getUserBookingsController, getAllBookingsController } = require('./booking.controller')

router.post('/', protect, validate(createBookingSchema), createBookingController)
router.delete('/:id', protect, cancelBookingController)
router.get('/', protect, getUserBookingsController)
router.get('/all', protect, authorizeRole('admin', 'super_admin'), getAllBookingsController)

module.exports = router
