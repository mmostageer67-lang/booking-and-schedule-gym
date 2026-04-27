const User=require('../users/user.model')
const generateToken=require('../../utils/generateToken')
const register=async(userData)=>
{
    
    const {email,name,password,subscription,role}=userData
    const existUser=await User.findOne({email})
    if(existUser)
    { 
        const err = new Error("User already exists"); 
err.status=409
throw err
    }

const user=await User.create({
   email,
    role,
    name,
    password,
    subscription
})
return user
}
const login=async(userData)=>
{
    const {email,password}=userData
    const user=await User.findOne({email}).select('+password')
    if(!user)
    {
        const err=new Error("Invalid email or password")
        err.status=401
        throw err 
    }
    const isMatch=await user.comparePassword(password)
    if(!isMatch)
    {
        const err=new Error("Invalid email or password")
        err.status=401
        throw err
    }
    const token=generateToken(user._id)
    return {user,token}

}
module.exports={register,login}
