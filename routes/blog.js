const express = require("express")
const multer = require('multer')
const routes = express.Router()
const { tokenVerification } = require("../middlewares/Auth")
const path = require("path")
const Blog = require("../models/blog")
const Comment = require("../models/comment")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/upload/`))
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`
    cb(null, filename)
  }
})

const upload = multer({ storage: storage })

routes.get("/addblog", tokenVerification, (req, res) => {
  const Userdetail = req.user
  if (Userdetail) {
    return res.render("addBlog", { success: true, name: Userdetail.name })
  } else {
    return res.render("addBlog", { success: false })
  }
})

routes.post("/", tokenVerification, upload.single("file"), async (req, res) => {
  const { title, body } = req.body;
  const blog = await Blog.create({
    title: title,
    body: body,
    profileImage: `/upload/${req.file.filename}`,
    createdBy: req.user.id,
  })
  await blog.save()
  return res.redirect("/")
})

routes.get("/:id", tokenVerification, async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy")
  const comments =await Comment.find({blogId:req.params.id}).populate("createdBy")
  return res.render("blog", {
    success: true,
    name: req.user.name,
    blog: blog,
    comments,
  })
  
})

routes.post("/comment/:id",tokenVerification,async (req,res)=>{
  const comment=await Comment.create({
    content:req.body.content,
    blogId:req.params.id,
    createdBy:req.user.id
  })
  await comment.save()
  return res.redirect(`/blog/${req.params.id}`)
})

module.exports = routes