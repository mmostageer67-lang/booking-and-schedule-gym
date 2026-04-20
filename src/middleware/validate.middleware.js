const { safeParse } = require("zod")

const validate=(schema)=>(req,res,next)=>
{
const result=safeParse(req.body)
if(!result.success)
{
    return res.status(400).json({
        success:false,
        message:result.error.errors.map(e=>e.message)
    })
}
const validatedData=result.data
next()
}
module.exports={validate}