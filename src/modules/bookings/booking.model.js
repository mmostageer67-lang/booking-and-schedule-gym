const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  bookingDate: {
    type: Date,
    default: () => new Date()
  }
}, { timestamps: true })

bookingSchema.index(
  { user: 1, class: 1 },
  { partialFilterExpression: { status: { $ne: 'cancelled' } }, unique: true }
)
bookingSchema.index({ user: 1 })
bookingSchema.index({ class: 1 })
bookingSchema.index({ status: 1 })

const cleanTransform = (doc, ret) => {
  ret.id = ret._id
  delete ret._id
  delete ret.__v
  return ret
}
bookingSchema.set('toObject', { transform: cleanTransform })
bookingSchema.set('toJSON', { transform: cleanTransform })

module.exports = mongoose.model('Booking', bookingSchema)
