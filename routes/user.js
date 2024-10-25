const express=require("express")
const routes=express.Router()
const {handlerRegister,handlerLogin}=require("../controllers/user")

routes.get("/register",(req,res)=>{
   return res.render("register")
})
routes.get("/login",(req,res)=>{
    return res.render("login")
})
routes.get("/logout",(req,res)=>{
     res.clearCookie('token')
     return res.redirect("/")
})
routes.post("/login",handlerLogin)

routes.post("/register",handlerRegister)

module.exports=routes
