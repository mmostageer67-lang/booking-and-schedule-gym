const { register, login } = require("./auth.service")

const registerController=async (req,res,next) => {
    try {
      

        const user=await register(req.validatedData)
        res.status(201).json({
            success:true,
            message : "user created successfully",
             user: {
    id: user._id,
    email: user.email,
    name: user.name,
    role:user.role,
    subscription:user.subscription,
    createdAt:user.createdAt,
    updatedAt:user.updatedAt
  }
        })
    } catch (error) {
       return next(error)
    }}
    const loginController=async(req,res,next)=>
    {
        try {
        const {user,token}=await login(req.validatedData)    
        res.status(200).json({
            success:true,
            message:"user logged in successfully",
            token,
            user:{
                id:user._id,
                email:user.email,
                name:user.name,
                role:user.role,
                subscription:user.subscription,
              
                createdAt:user.createdAt,
                updatedAt:user.updatedAt,

            }
        })
        } catch (error) {
            return next (error)
        }
    }

module.exports={registerController,loginController}
