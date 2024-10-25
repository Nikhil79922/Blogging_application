const jwt = require('jsonwebtoken');
function tokenVerification(req,res,next){
   const tokenvalue=req.cookies.token
   if(!tokenvalue){
    return res.status(401).redirect("/user/login")
   }else{
    const decoded=jwt.verify(tokenvalue,process.env.SECRET_KEY)
    req.user=decoded
    next()
   }
}
module.exports={
    tokenVerification,
}