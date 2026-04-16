const router=require('../users/user.model')
const { registerController } = require('./auth.controller')
const authMiddleware=('../../middleware/auth.middleware.js')
router.post('/register',registerController)
module.exports=router