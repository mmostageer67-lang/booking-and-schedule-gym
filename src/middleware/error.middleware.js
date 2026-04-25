const errorMddleware=(err,req,res,next)=>
{
      if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "User already exists"
    })
  }
const status=err.statusCode||500
const message=err.message||"Internal Server Error"
return res.status(status).json({
    success:false,
    message:message
})
 
}
module.exports=errorMddleware