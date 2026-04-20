const express=require('express')
const router=express.Router()
const { registerController } = require('./auth.controller')
const protect=require('../../middleware/auth.middleware')
const authorizeRole = require('../../middleware/role.middleware')
const { validate } = require('../../middleware/validate.middleware')
const { registerSchema } = require('./auth.validation')
router.post('/register',protect,authorizeRole('admin','super_admin'),validate(registerSchema),registerController)
module.exports=router