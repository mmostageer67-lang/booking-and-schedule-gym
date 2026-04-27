
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
  days: {
    type: Number,
    min: [1, "Subscription days must be greater than 0"]
  },
  start_date: Date,
  expire_date: Date,
  isActive: {
    type: Boolean,
    default: false
  }
}
},{timestamps:true})
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = async function (candidatePassword) {
    if (!this.password) return false
    return bcrypt.compare(candidatePassword, this.password)
}
    
const cleanTransform=(doc,ret)=>{
ret.id=ret._id
delete ret._id
delete ret.password
delete ret.__v

return ret}
userSchema.set('toObject',{transform:cleanTransform})
userSchema.set('toJSON',{transform:cleanTransform})

module.exports=mongoose.model('User',userSchema)
