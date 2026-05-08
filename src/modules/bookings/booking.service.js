const Booking = require('./booking.model')

const createBooking = async (userId, data) => {
  const booking = await Booking.create({
    user: userId,
    class: data.class,
    bookingDate: data.bookingDate ? new Date(data.bookingDate) : new Date()
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

const getUserBookings = async (userId, page = 1, limit = 20) => {
  const skip = (page - 1) * limit
  const [bookings, total] = await Promise.all([
    Booking.find({ user: userId })
      .populate('class', 'name description')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Booking.countDocuments({ user: userId })
  ])

  return { bookings, total, page, limit, pages: Math.ceil(total / limit) }
}

const getAllBookings = async (page = 1, limit = 50) => {
  const skip = (page - 1) * limit
  const [bookings, total] = await Promise.all([
    Booking.find()
      .populate('user', 'name email')
      .populate('class', 'name description')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Booking.countDocuments()
  ])

  return { bookings, total, page, limit, pages: Math.ceil(total / limit) }
}

module.exports = { createBooking, cancelBooking, getUserBookings, getAllBookings }
