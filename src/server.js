require('dotenv').config()
const app = require('./app')
const connectDB = require('./config/db')
const getPort=()=> {
const rawPort=process.env.PORT 
if(rawPort===undefined) return 3000
const trimmed=rawPort.trim()
if(trimmed==="")return 3000
const port= Number(trimmed)

if(!Number.isInteger(port)||port<1||port>65535){
   throw new Error(`Invalid PORT: ${rawPort}`)
}
return port

}
const PORT=getPort()
const startServer = async () => {
    try {
        await connectDB()

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (error) {
        console.error(`Server failed to start: ${error.message}`)
        process.exit(1)
    }
}

startServer()