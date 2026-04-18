const express=require('express')
const router=express.Router()
const { registerController } = require('./auth.controller')
router.post('/register',registerController)
module.exports=router