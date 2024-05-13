const jwt=require('jsonwebtoken')
require('dotenv').config();

function jwtGenerator(id,role){
    const payload={
        user:id,
        role:role
    }
    return jwt.sign(payload,process.env.jwtSecret,{expiresIn:"1hr"})
}
module.exports=jwtGenerator