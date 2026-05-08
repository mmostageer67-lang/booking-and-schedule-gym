const Booking = require('./booking.model')
const User = require('../users/user.model')

const createBooking = async (userId, data) => {
  const user = await User.findById(userId)
  if (!user) {
    const err = new Error("User not found")
    err.status = 404
    throw err
  }

  const existing = await Booking.findOne({ user: userId, class: data.class, status: { $nin: ['cancelled'] } })
  if (existing) {
    const err = new Error("You already have a booking for this class")
    err.status = 409
    throw err
  }

  const booking = await Booking.create({
    user: userId,
    class: data.class,
    bookingDate: data.bookingDate ? new Date(data.bookingDate) : Date.now()
  })

  return booking
}

const cancelBooking = async (bookingId, userId) => {
  const booking = await Booking.findById(bookingId)
  if (!booking) {
    const err = new Error("Booking not found")
    err.status = 404
    throw err
  }

  if (booking.user.toString() !== userId.toString()) {
    const err = new Error("You can only cancel your own bookings")
    err.status = 403
    throw err
  }

  if (booking.status === 'cancelled') {
    const err = new Error("Booking is already cancelled")
    err.status = 400
    throw err
  }

  booking.status = 'cancelled'
  await booking.save()
  return booking
}

const getUserBookings = async (userId) => {
  const bookings = await Booking.find({ user: userId }).populate('class')
  return bookings
}

const getAllBookings = async () => {
  const bookings = await Booking.find().populate('user').populate('class')
  return bookings
}

module.exports = { createBooking, cancelBooking, getUserBookings, getAllBookings }
