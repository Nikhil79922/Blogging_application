const mongoose=require("mongoose")

const Schema= new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    blogId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"blogs",
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
    }
},{timestamps:true})
const Comment=mongoose.model("comments",Schema)
module.exports=Comment
