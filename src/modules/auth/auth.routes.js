const express=require('express')
const router=express.Router()
const { registerController } = require('./auth.controller')
const protect=require('../../middleware/auth.middleware')
const authorizeRole = require('../../middleware/role.middleware')
router.post('/register',protect,authorizeRole('admin','super_admin'),registerController)
module.exports=router