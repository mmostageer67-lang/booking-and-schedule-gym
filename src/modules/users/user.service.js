const User =require('./user.model')
const bcrypt=require('bcryptjs')
const update=async(userId,updateData)=>
{
    try {
  if (updateData.isActive !== undefined) {
        updateData.subscription = {
            ...(updateData.subscription || {}),
            isActive: updateData.isActive
        }
        delete updateData.isActive
    }

  if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10)
    }
        const user = await User.findByIdAndUpdate(userId,updateData,{new:true})

if(!user){throw new Error("user not found");
}

return user

    } catch (error) {
        throw(error)
    }
}
module.exports=update
