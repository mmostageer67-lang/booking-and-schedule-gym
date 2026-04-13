
require('dotenv').config()
const connectDB=require('./config/db')
const app=require('./app')
const startServer=async () => {
    try {
        await connectDB()
    const PORT=process.env.PORT||3000
app.listen(PORT,()=>
{
console.log(`Server running on port ${PORT}`)  })
}
   catch (error) {
console.error(`Database Error: ${error.message}`)
        process.exit(1)
    }}
    
   startServer()