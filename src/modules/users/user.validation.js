const z=require('zod')
const {emailSchema,passwordSchema}=require('../auth/auth.validation')
const updateUserValidation=z.object({
    email:emailSchema.optional(),
    password:passwordSchema.optional(),
    name:z.string().trim().min(3,"Name must be at least 3 characters").optional(),
    isActive:z.boolean().optional(),
    role:z.preprocess(
        value => typeof value=== 'string' ? value.trim().toLocaleLowerCase()
.replace(/\s+/g,'_'):value, z.enum(['admin','client','super_admin']).optional() )
,subscription:z.object({
    days:z.number().int().positive("Subscription days must be greater than 0").optional(),
    start_date:z.string().refine(val=>!isNaN(Date.parse(val)), {
    message: "Invalid date format"
  }).optional(),
    isActive:z.boolean().optional()
}).optional()
})
module.exports={updateUserValidation}
