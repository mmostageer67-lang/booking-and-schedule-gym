const mongoose = require('mongoose')

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI?.trim()

  if (!mongoUri) {
    throw new Error('MONGO_URI is not defined')
  }

  const connection = await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 5000
  })

  console.log(`MongoDB connected: ${connection.connection.host}/${connection.connection.name}`)

  return connection
}

const disconnectDB = async () => {
  if (mongoose.connection.readyState === 0) return
  await mongoose.connection.close()
  console.log('MongoDB connection closed')
}

module.exports = { connectDB, disconnectDB }

