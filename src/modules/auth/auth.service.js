const User=require('../users/user.model')
const register=async(userData)=>
{
    const {email,name,password,subscription}=userData
    const existUser=await User.findOne({email})
    if(existUser)
    { 
        const err = new Error("User already exists"); 
err.statusCode=409
throw err
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
