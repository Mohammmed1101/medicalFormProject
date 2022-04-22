const express = require("express")
const jwt = require("jsonwebtoken")
const mongoose= require('mongoose');

const { Post, postJoi, editJoi } = require("../model/post")
const { User } = require("../model/user")

const router = express.Router() 
//add post
router.post("/", async (req, res) => {
    try {
 
        const { title,description, image} = req.body
        //check token
        const token = req.header("Authorization")
        if (!token) return res.status(401).json("token is missing")
        
        const decryptToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
          
        const UserId = decryptToken.id
        req.UserId = UserId
        
        const isCompany = await User.findById(UserId)
        if (!isCompany) return res.status(404).json("user not found")
     //  if (isCompany.role!=="Company"& isCompany.role!=="DRA") return res.status(404).send("you are not allowed to add post!!")
        
        const result = postJoi.validate(req.body)
        if (result.error) return res.status(404).json(result.error.details[0].message)

        const post = new Post({
            title,
            description,
            image,
            owner: req.UserId,
        })
            
        await User.findByIdAndUpdate(req.UserId, { $push: { post: post._id } })
      
        await post.save()
        res.json(post)

} catch (error) {
        console.log(error.message)
        res.status(500).json("The problem in server")
    }
})
//viwe posts 
router.get("/posts", async (req, res) => {
    try {
        const posts = await Post.find().sort("-Date").populate("owner","companyName")
        res.json(posts)
    } catch (error) {
        console.log(error.message)
        res.status(500).json("The problem in server")
    }
})
router.get("/:id", async (req, res) => {
    try {
        //check id
        const id = req.params.id
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).send("The path is not valid")

        const post = await Post.findById(req.params.id).populate("owner","companyName")
    
        if (!post) return res.status(404).json("post is not found")

        res.json(post)

    } catch (error) {
        console.log(error.message)
        res.status(500).json("The problem in server")
    }
})
//delet post
router.delete("/:id", async (req, res) => {
    try {

        //check token
        const token = req.header("Authorization")
        if (!token) return res.status(401).json("token is missing")

        const decryptToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const userId = decryptToken.id
     
        const user = await User.findById(userId).select("-password")
        if (!user) return res.status(404).json("user not found")
        req.userId = userId

        //check id
        const id = req.params.id
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).send("The path is not valid")
    
            const posts = await Post.findByIdAndRemove(req.params.id)
             if (!posts) return res.status(404).json("post not found")

            const isAdmin = await User.findById(userId)
             if (!isAdmin) return res.status(404).json("user not found")
             if (posts.owner != req.userId & isAdmin.role!=="Admin" ) return res.status(403).json("Unauthorized action")
    
        await User.findByIdAndUpdate(req.userId, { $pull: { posts: Post._id } })
        res.json(posts) 
    } catch (error) {
        console.log(error.message)
        res.status(500).json("The problem in server")
    }
})

module.exports = router