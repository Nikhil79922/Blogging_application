const mongoose=require("mongoose")

const Schema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    profileImage:{
        type:String,
        default:"/image/userAvatar.png"
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER",
    }
})
const User=mongoose.model("users",Schema)
module.exports=User


