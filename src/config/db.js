const mongoose=require('mongoose')

const connectDB=async () => {
    
       if(!process.env.MONGO_URI)
       {throw new Error("MONGO_URI not defined");
       }
        const conn =await mongoose.connect(process.env.MONGO_URI)
      
 console.log(`MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`)
    
}
module.exports=connectDB