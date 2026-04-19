const jwt =require ('jsonwebtoken')
const protect= (req,res,next) => {
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
        if (!token) {
  return res.status(401).json({
    success: false,
    message: "Token missing"
  })
}
const decoded=jwt.verify(token,process.env.SECRET_JWT)
req.user=decoded
return next()
    } catch (error) {
return next(error)
    
    }
}
module.exports = protect;