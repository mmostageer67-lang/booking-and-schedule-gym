const User=require('../users/user.model')
const register=async(userData)=>
{
    const {email,name,password,subscription}=userData
    const existUser=await User.findOne({email:userData.email})
    if(existUser)
    {
throw new Error("user already exist");

    }
const user=await User.create({
    email,
    role:'client',
    name,
    password,
    subscription
})
return user
}
module.exports={register}
