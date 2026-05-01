const User =require('./user.model')
const bcrypt=require('bcryptjs')
const buildSubscription=require('../../utils/subscription')
const update=async(userId,updateData)=>
{
    try {
        const user=await User.findById(userId)

        if(!user){
            const err=new Error("user not found")
            err.status=404
            throw err
        }

        const updatePayload={...updateData}

        if (updatePayload.isActive !== undefined) {
            updatePayload.subscription = {
                ...(updatePayload.subscription || {}),
                isActive: updatePayload.isActive
            }
            delete updatePayload.isActive
        }

        if (updatePayload.subscription) {
            updatePayload.subscription=buildSubscription(updatePayload.subscription,user.subscription)
        }

        if (updatePayload.password) {
            updatePayload.password = await bcrypt.hash(updatePayload.password, 10)
        }

        const updatedUser = await User.findByIdAndUpdate(userId,updatePayload,{new:true,runValidators:true})

        return updatedUser

    } catch (error) {
        throw(error)
    }
}
module.exports=update
