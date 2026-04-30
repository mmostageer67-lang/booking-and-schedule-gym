const z=require('zod')
const {emailSchema,passwordSchema}=require('../auth/auth.validation')
const updateUserValidation=z.object({
    email:emailSchema.optional(),
    password:passwordSchema.optional(),
    name:z.string().trim().min(3,"Name must be at least 3 characters").optional(),
    role:z.preprocess(
        value => typeof value=== 'string' ? value.trim().toLocaleLowerCase()
.replace(/\s+/g,'_'):value, z.enum(['admin','client','super_admin']).optional().default('client') )
,subescription:z.object({
    days:z.number().int().positive("Subscription days must be greater than 0"),
    start_date:z.string().refine(val=>!isNaN(Date.parse(val)), {
    message: "Invalid date format"
  })
}).optional()
})
module.exports={updateUserValidation}