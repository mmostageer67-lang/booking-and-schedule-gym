const mongoose = require('mongoose')

const parseEnvInt = (key, defaultValue, min, max) => {
  const raw = process.env[key]
  if (raw === undefined || raw.trim() === '') return defaultValue
  const parsed = Number(raw.trim())
  if (!Number.isInteger(parsed)) throw new Error(`${key} must be an integer, got: ${raw}`)
  if (parsed < min || parsed > max) throw new Error(`${key} must be between ${min} and ${max}, got: ${parsed}`)
  return parsed
}

const getMongoUri = () => {
  const uri = process.env.MONGO_URI?.trim()
  if (!uri) throw new Error('MONGO_URI is not defined')
  return uri
}

let connectionRetryCount = 0

const attachEventListeners = () => {
  mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error.message)
  })

  mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected')
  })

  mongoose.connection.on('reconnected', () => {
    console.log('MongoDB reconnected')
  })
}

const connectDB = async () => {
  const mongoUri = getMongoUri()
  const maxAttempts = parseEnvInt('DB_RETRY_MAX_ATTEMPTS', 5, 1, 20)
  const baseDelay = parseEnvInt('DB_RETRY_BASE_DELAY_MS', 1000, 100, 10000)
  
  const serverSelectionTimeoutMS = parseEnvInt('DB_SERVER_SELECTION_TIMEOUT_MS', 5000, 1000, 30000)
  const maxPoolSize = parseEnvInt('DB_MAX_POOL_SIZE', 10, 1, 100)
  const minPoolSize = parseEnvInt('DB_MIN_POOL_SIZE', 0, 0, 50)
  const maxIdleTimeMS = parseEnvInt('DB_MAX_IDLE_TIME_MS', 0, 0, 300000)

  attachEventListeners()

  while (connectionRetryCount < maxAttempts) {
    try {
      await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS,
        maxPoolSize,
        minPoolSize,
        maxIdleTimeMS,
      })

      console.log('MongoDB connected')
      connectionRetryCount = 0
      return mongoose.connection
    } catch (error) {
      connectionRetryCount++

      if (connectionRetryCount >= maxAttempts) {
        throw new Error(`MongoDB connection failed after ${maxAttempts} attempts: ${error.message}`)
      }

      const delay = baseDelay * Math.pow(2, connectionRetryCount - 1)
      console.warn(
        `MongoDB connection attempt ${connectionRetryCount} failed. Retrying in ${delay}ms...`,
        error.message
      )

      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }
}

const disconnectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    console.log('MongoDB already disconnected')
    return
  }

  try {
    await mongoose.connection.close()
    console.log('MongoDB connection closed')
  } catch (error) {
    console.error('Error closing MongoDB connection:', error.message)
    throw error
  }
}

module.exports = { connectDB, disconnectDB }
