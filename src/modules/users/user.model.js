
const bcrypt=require('bcryptjs')
const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
name:
{
    type:String,
    required:true,
    trim:true
},
email:
{
    type:String,
    required:true,
    unique:true,
    trim:true,
    lowercase:true
},
password:
{
    type:String,
    required:true,
    minLength:[6,"the password atlest 6 caracters"],
    select:false
},
role:
{
    type:String,
    enum:['admin','client'],
    default:'client'
}
},{timestamps:true})
userSchema.pre('save',async function(next)
{
    if(!this.isModified('password'))
    {
        return next()
    }
    this.password=await bcrypt.hash(this.password,10)
    next()
})
module.exports=mongoose.model('User',userSchema)