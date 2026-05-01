const mongoose = require('mongoose')
  const connectDB = async () => {
  
    if (!process.env.MONGO_URI)
    {
        throw new Error('MONGO_URI is missing')
    }
  
  const connection = await mongoose.connect(process.env.MONGO_URI)
     console.log(`Database connected: ${connection.connection.host}`)

        return connection
}

module.exports=connectDB