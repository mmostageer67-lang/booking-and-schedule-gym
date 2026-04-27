const{z}=require('zod')

const emailSchema=z
.string()
.trim()
.toLowerCase()
.email("Invalid email format")

const passwordSchema=z
.string()
.min(6,"Password must be at least 6 characters")

const registerSchema=z.object({
name:z
.string()
.trim()
.min(3, "Name must be at least 3 characters")
 ,
email:emailSchema
,
password:passwordSchema

,
role:z
.preprocess(
value=>typeof value==='string'?value.trim().toLowerCase().replace(/\s+/g,'_'):value,
z.enum(['admin','client','super_admin']).optional().default('client')
)


})

const loginSchema=z.object({
email:emailSchema,
password:passwordSchema
})

module.exports={registerSchema,loginSchema}
