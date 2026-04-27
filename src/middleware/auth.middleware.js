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
              let decoded

     try{
 decoded=jwt.verify(token,process.env.SECRET_JWT)
}catch{
  return res.status(401).json({
  success:false,
  message:"Unauthorized" 
})
}
const user=await User.findById(decoded.id).select('-password')
  if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      })
    }
req.user=user
  return next()
    }catch (error) {
  
 
 
  
    return next (error)
  }}
   

module.exports = protect;
