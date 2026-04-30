const router=require('express').Router()
const protect=require('../../middleware/auth.middleware')
const authorizeRole = require('../../middleware/role.middleware')
const { updateUserValidation } = require('./user.validation.js')
const{updateController}=require('./user.controller')
const { validate } = require('../../middleware/validate.middleware.js')
router.put('/update/:id',protect,authorizeRole(['admin','super_admin']),validate (updateUserValidation),updateController)
module.exports=router