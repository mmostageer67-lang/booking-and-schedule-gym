const { register } = require("./auth.service")

const registerController=async (req,res,next) => {
    try {
        const userData=req.body
        const user=await register(userData)
        res.status(201).json({
            success:true,
            message : "user created successfully",
            user
        })
    } catch (error) {
         res.status(400).json({
            success:false,
            message : error.message
         })
    }
}
module.exports={registerController}