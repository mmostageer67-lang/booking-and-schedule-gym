const { createBooking, cancelBooking, getUserBookings, getAllBookings } = require('./booking.service')

const createBookingController = async (req, res, next) => {
  try {
    const booking = await createBooking(req.user.id, req.validatedData)
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking
    })
  } catch (error) {
    return next(error)
  }
}

const cancelBookingController = async (req, res, next) => {
  try {
    const booking = await cancelBooking(req.params.id, req.user.id)
    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      booking
    })
  } catch (error) {
    return next(error)
  }
}

const getUserBookingsController = async (req, res, next) => {
  try {
    const bookings = await getUserBookings(req.user.id)
    res.status(200).json({
      success: true,
      bookings
    })
  } catch (error) {
    return next(error)
  }
}

const getAllBookingsController = async (req, res, next) => {
  try {
    const bookings = await getAllBookings()
    res.status(200).json({
      success: true,
      bookings
    })
  } catch (error) {
    return next(error)
  }
}

module.exports = { createBookingController, cancelBookingController, getUserBookingsController, getAllBookingsController }
