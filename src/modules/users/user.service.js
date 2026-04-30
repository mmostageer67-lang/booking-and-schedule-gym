const User =require('./user.model')
const update=async(userId,updateData)=>
{
    try {
        const {name,email,role,subscription,password }= updateData
const user = await User.findByIdAndUpdate(userId,updateData,{new:true})

if(!user){throw new Error("user not found");
}

if (password){
user.password= password
}
await user.save()
return user

    } catch (error) {
        throw(error)
    }
}
module.exports=update