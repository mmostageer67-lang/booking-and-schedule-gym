const User=require('../users/user.model')
const register=async(userData)=>
{
    const existUser=await User.findOne({email:userData.email})
    if(existUser)
    {
throw new Error("user already exist");

    }
const user=await User.create(userData)
return user
}
module.exports={register}
