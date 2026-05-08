const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const routes = require('./routes/index')
const errorMiddleware = require('./middleware/error.middleware')

const app = express()

app.use(helmet())
app.use(cors({ origin: process.env.CORS_ORIGIN || '*', credentials: true }))
app.use(express.json({ limit: '100kb' }))
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))
app.use('/api', routes)
app.use((req, res, next) => {
  const err = new Error("Route not found")
  err.status = 404
  next(err)
})
app.use(errorMiddleware)

module.exports = app
