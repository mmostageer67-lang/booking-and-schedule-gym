const mongoose = require('mongoose')

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  capacity: {
    type: Number,
    required: true,
    min: [1, "Capacity must be at least 1"]
  },
  price: {
    type: Number,
    min: [0, "Price cannot be negative"]
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true })

const cleanTransform = (doc, ret) => {
  ret.id = ret._id
  delete ret._id
  delete ret.__v
  return ret
}
classSchema.set('toObject', { transform: cleanTransform })
classSchema.set('toJSON', { transform: cleanTransform })

module.exports = mongoose.model('Class', classSchema)
