const jwt =require ('jsonwebtoken')
const User = require('../modules/users/user.model')
const protect= async(req,res,next) => {
    try {
      const authHeader=req.headers.authorization
        if(!authHeader||!authHeader.startsWith("Bearer "))
    {
      return  res.status(401).json({
            success:false,
            message :"Invalid token"
        })
    }
        const token=authHeader.split(' ')[1]
     
const decoded=jwt.verify(token,process.env.SECRET_JWT)
const user=await User.findById(decoded.id).select('-password')
  if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      })
    }
req.user=user
 next()
    }catch (error) {
   
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired"
      });
    }
  }
   return res.status(500).json({
    success: false,
    message: "Internal server error"
  });
}
module.exports = protect;
