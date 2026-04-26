const errorMddleware=(err,req,res,next)=>
{
    if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "User already exists"
    })
  }
const status=err.status&&err.status<500
?err.status:500 
const message=status===500?  "Internal Server Error"
    : err.message;
return res.status(status).json({
    success:false,
    message
})
 
}
module.exports=errorMddleware