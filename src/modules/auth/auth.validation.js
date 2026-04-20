const{z}=require('zod')
const registerSchema=z.object({
name:z
.string()
.min(3, "Name must be at least 3 characters")
  .nonempty("Name is required"),
email:z
.string()
 .nonempty("Email is required")
.email("Invalid email format"),
password:z
.string()
.min(6,"Password must be at least 6 characters")
})
module.exports={registerSchema}