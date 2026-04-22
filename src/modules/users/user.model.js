
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
    enum:['admin','client','super_admin'],
    default:'client'
},
subscription: {
  plan: {
    type: String,
    enum: ['day','week','month','year']
  },
  expiresAt: Date
}
},{timestamps:true})
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return
        
    

    this.password = await bcrypt.hash(this.password, 10)
})
userSchema.set('toObject',{transform:function (doc,ret) {
    

ret.id=ret._id
delete ret._id
delete ret.password
delete ret.__v

return ret
}})
module.exports=mongoose.model('User',userSchema)
