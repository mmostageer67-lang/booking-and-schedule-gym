const express=require('express')
const router=express.Router()
const userRoutes=require('../modules/users/user.routes')
const authRouter=require('../modules/auth/auth.routes')
router.use('/auth',authRouter)
router.use('/users',userRoutes)
module.exports=router