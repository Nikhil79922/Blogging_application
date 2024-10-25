const express=require("express")
const path=require("path")
const app=express()
const port=8000;
const mongoose  = require("mongoose");
const cookieParser = require('cookie-parser')
require('dotenv').config();
const {tokenVerification}=require("./middlewares/Auth")
const Blog=require("./models/blog")

//Imported Routes
const UserRoute=require("./routes/user");
const BlogRoute=require("./routes/blog");

//MiddleWare
app.use(express.static(path.resolve('./public')))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set("view engine", "ejs")
app.set("views",path.resolve("views"))

//MongoDB Connect
mongoose.connect("mongodb://localhost:27017/Blog_App").then(()=>console.log("MongoDB Running")).catch((err)=>console.log(err))

//Routes
app.get("/",tokenVerification, async (req,res)=>{
    const Userdetail=req.user
    const allblog=await Blog.find({})
    if(Userdetail){
        return res.render("home",{success:true , name:Userdetail.name , blogs:allblog})
       }else{
           return res.render("home",{success:false})
       }  
})

//Connecting Routes
app.use("/user",UserRoute)
app.use("/blog",BlogRoute)
app.listen(port,()=>console.log(`Server is running at port:${port}`))

