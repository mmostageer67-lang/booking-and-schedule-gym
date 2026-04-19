const { register } = require("./auth.service")

const registerController=async (req,res,next) => {
    try {
        const {email,password,name}=req.body
        if (!email || !password || !name) {
  return res.status(400).json({ message: "All fields are required" })
}
        
        const user=await register(req.body)
        res.status(201).json({
            success:true,
            message : "user created successfully",
            user
        })
    } catch (error) {
       return next(error)
    }
}
module.exports={registerController}