const express=require("express")
const path=require("path")
const app=express()
const port=8000;
const UserRoute=require("./routes/user");
const  mongoose  = require("mongoose");
const cookieParser = require('cookie-parser')

//MiddleWare
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set("view engine", "ejs")
app.set("views",path.resolve("views"))

//MongoDb Connect
mongoose.connect("mongodb://localhost:27017/Blog_App").then(()=>console.log("MongoDB Running")).catch((err)=>console.log(err))

app.get("/",(req,res)=>{
    res.render("home")
})

app.use("/user",UserRoute)
app.listen(port,()=>console.log(`Server is running at port:${port}`))

