const User = require("../models/user")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function handlerRegister(req, res) {
    try {
        const { name, email, password } = req.body
        const hashedPass = await bcrypt.hash(password, 10)
        const newUser = new User({ name, email, password: hashedPass })
        await newUser.save()
        return res.redirect("/user/login")
    } catch (err) {
        return res.status(400).render("Register",{error:"Email Already exists" , success: false })
    }
}
async function handlerLogin(req, res) {
    try {
        const { email, password } = req.body
        const findUser = await User.findOne({ email });
        if (!findUser) return res.status(400).render("login",{error:"Incorrect email" , success: false })
        const hashedPass = findUser.password
        const confirmPass = await bcrypt.compare(password, hashedPass)
        if (!confirmPass) return res.status(400).render("login",{error:"Incorrect Password" , success: false })
        const token=jwt.sign({email, name:findUser.name ,id:findUser._id},process.env.SECRET_KEY)
        if(token){
            res.cookie("token",token);
        } else{
            return res.status(400).json({ message: "Token Not valid ", success: false })
               }
               return res.redirect("/")
    } catch (err) {
        return res.status(400).json({ message: "404 Bad Request ", success: false })
    }
}
module.exports = {
    handlerRegister,
    handlerLogin,
}
