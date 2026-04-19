const express = require('express')
const morgan = require('morgan')
const routes=require('./routes/index')
const errorMddleware = require('./middleware/error.middleware')
const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use('/api',routes)
app.use(errorMddleware)
module.exports = app
