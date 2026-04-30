const update = require("./user.service")

const updateController=async (req,res,next) => {
    try {
        const {name ,password,email,role,subscription}=req.body
        const {id}=req.params
const {userId}=req.user
        const user=await update(req.params.userId,req.body)
        res.status(200).json({
            success:true,
            message:"user updated successfully",
            user
        })
    } catch (error) {
        return next (error)
    }
}
module.exports={updateController}