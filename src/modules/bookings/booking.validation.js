const z = require('zod')

const createBookingSchema = z.object({
  class: z.string().min(1, "Class ID is required"),
  bookingDate: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format"
  }).optional()
})

const cancelBookingSchema = z.object({
  id: z.string().min(1, "Booking ID is required")
})

module.exports = { createBookingSchema, cancelBookingSchema }
