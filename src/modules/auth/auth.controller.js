const { register } = require("./auth.service")

const registerController=async (req,res,next) => {
    try {
      

        const user=await register(req.validatedData)
        res.status(201).json({
            success:true,
            message : "user created successfully",
             user: {
    id: user._id,
    email: user.email,
    name: user.name
  }
        })
    } catch (error) {
       return next(error)
    }
}
module.exports={registerController}