require('dotenv').config({ quiet: true })

const app = require('./app')
const { connectDB, disconnectDB } = require('./config/db')
const parseEnvInt = (key, defaultValue, min, max) => {
  const raw = process.env[key]
  if (raw === undefined || raw.trim() === '') return defaultValue
  const parsed = Number(raw.trim())
  if (!Number.isInteger(parsed)) throw new Error(`${key} must be an integer, got: ${raw}`)
  if (parsed < min || parsed > max) throw new Error(`${key} must be between ${min} and ${max}, got: ${parsed}`)
  return parsed
}

const getPort = () => {
  const rawPort = process.env.PORT
  if (rawPort === undefined) return 3000
  const trimmedPort = rawPort.trim()
  if (trimmedPort === '') return 3000
  const port = Number(trimmedPort)
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`Invalid PORT: ${rawPort}`)
  }
  return port
}

const startServer = async () => {
  try {
    const PORT = getPort()
    const gracePeriod = parseEnvInt('SHUTDOWN_GRACE_PERIOD_MS', 10000, 1000, 60000)
    const keepAliveTimeout = parseEnvInt('KEEP_ALIVE_TIMEOUT_MS', 5000, 1000, 120000)
    const headersTimeout = parseEnvInt('HEADERS_TIMEOUT_MS', 6000, 1000, 120000)

    await connectDB()

    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })

    server.keepAliveTimeout = keepAliveTimeout
    server.headersTimeout = headersTimeout

    server.on('error', (error) => {
      console.error('Server error:', error.message)
      process.exit(1)
    })

    let isShuttingDown = false

    const forceShutdown = () => {
      console.error('Grace period exceeded. Force closing server...')
      process.exit(1)
    }

    const shutdown = async (signal) => {
      if (isShuttingDown) return
      isShuttingDown = true

      console.log(`${signal} received. Closing server...`)

      const timeout = setTimeout(forceShutdown, gracePeriod)
      timeout.unref()

      server.close(async () => {
        clearTimeout(timeout)

        try {
          await disconnectDB()
          console.log('Server shutdown complete')
          process.exit(0)
        } catch (error) {
          console.error('Error during shutdown:', error.message)
          process.exit(1)
        }
      })
    }

    process.on('SIGTERM', () => shutdown('SIGTERM'))
    process.on('SIGINT', () => shutdown('SIGINT'))
  } catch (error) {
    console.error('Failed to start server:', error.message)
    process.exit(1)
  }
}

startServer()
