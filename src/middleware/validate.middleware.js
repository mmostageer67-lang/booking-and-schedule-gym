
const validate=(schema)=>(req,res,next)=>
{
const result=schema.safeParse(req.body)
if(!result.success)
{
    const issues=result.error?.issues||[]
    const errors=issues.map(issue=>
    ({
        field:issue.path.length?issue.path.join('.'):'body',
        message:issue.message
    })
    )
    return res.status(400).json({
        success:false,
        errors
    })
}
req.validatedData=result.data
next()
}
module.exports={validate}