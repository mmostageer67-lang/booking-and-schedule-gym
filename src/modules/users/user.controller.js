const update = require("./user.service")
const updateController=async (req,res,next) => {
    try {
        const {id}=req.params

        const user=await update(id,req.validatedData)
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
