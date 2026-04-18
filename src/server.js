const app = require('./app')
const connectDB = require('./config/db')
require('dotenv').config()

const PORT = process.env.PORT || 3000

const startServer = async () => {
    try {
        await connectDB()

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (error) {
        console.log(`Server failed to start: ${error.message}`)
        process.exit(1)
    }
}

startServer()