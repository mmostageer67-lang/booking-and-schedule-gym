const errorMddleware=(err,req,res,next)=>
{
    if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "User already exists"
    })
  }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      });
    }

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired"
      });
    }
const status=err.status||500
const message=status===500?  "Internal Server Error"
    : err.message;
return res.status(status).json({
    success:false,
    message
})
 
}
module.exports=errorMddleware