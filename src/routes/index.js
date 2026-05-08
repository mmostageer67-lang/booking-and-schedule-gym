const express=require('express')
const router=express.Router()
const userRoutes=require('../modules/users/user.routes')
const authRouter=require('../modules/auth/auth.routes')
const bookingRoutes=require('../modules/bookings/booking.routes')
router.use('/auth',authRouter)
router.use('/users',userRoutes)
router.use('/bookings',bookingRoutes)
module.exports=router