const mongoose = require('mongoose')
  const connectDB = async () => {
  const mongoUri=process.env.MONGO_URI?.trim()
    if (!mongoUri)
    {
        throw new Error('MONGO_URI is missing')
    }
  
  const connection = await mongoose.connect(mongoUri)
     console.log(`Database connected: ${connection.connection.host}`)

        return connection
}

module.exports=connectDB