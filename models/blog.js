const mongoose=require("mongoose")

const Schema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true,
    },
    profileImage:{
        type:String,
        required:true,
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
    }
},{timestamps:true})
const Blog=mongoose.model("blogs",Schema)
module.exports=Blog


