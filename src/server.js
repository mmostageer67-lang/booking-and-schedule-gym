
require('dotenv').config()
const connectDB=require('./config/db')
const app=require('./app')  
  const PORT=process.env.PORT||3000

const startServer=async () => {
    try {
        await connectDB()
app.listen(PORT,()=>
{
console.log(`Server running on port ${PORT}`)  })
}
   catch (error) {
console.error(`Database Error: ${error.message}`)
        process.exit(1)
    }}
    
   startServer()