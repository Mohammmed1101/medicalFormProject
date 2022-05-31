const express = require("express")
const jwt = require("jsonwebtoken")
const mongoose= require('mongoose');
const { Comment, commentJoi } = require("../model/comment")
const  { drug , drugJoi  , editJoi , rateJoi} = require("../model/drugs")
const { User } = require("../model/user")
const router = express.Router()

// add drug
router.post("/",async (req, res) => {
    try {

        const {RegisterNo,Name ,description,termOfUse, image } = req.body
        //check token
        const token = req.header("Authorization")
        if (!token) return res.status(401).json("token is missing")

        const decryptToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const userId = decryptToken.id

        const user = await User.findById(userId).select("-password")
        if (!user) return res.status(404).json("user not found")
        req.userId = userId


     const isAdmin = await User.findById(userId)
        if (!isAdmin) return res.status(404).json("user not found")
        if (isAdmin.role!=="Admin" & isAdmin.role!=="DRA") return res.status(400).send("you are not allowed to add Drugs!!")

        const result = drugJoi.validate(req.body)
        if (result.error) return res.status(404).json(result.error.details[0].message)
        const Drug = new drug({
            RegisterNo,
            Name,
            description,
            termOfUse,
            image,  
            owner: req.userId, 
        })
        await User.findByIdAndUpdate(req.userId, { $push: { drugs: Drug._id } })
        await Drug.save()
        res.json(Drug)
    } catch (error) {
        console.log(error.message)
        res.status(500).json("The problem in server")
    }
})
//view drugs
router.get("/drugs", async (req, res) => {
    try {
        const drugs = await drug.find().sort("-Date").populate({ path:"comments" ,populate:{path:"comment"}})
        res.json(drugs)
    } catch (error) {
        console.log(error.message)
        res.status(500).json("The problem in server")
    }
})
//view specific drug
router.get("/:id", async (req, res) => {
    try {
        //check id
        const id = req.params.id

        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).send("The path is not valid")

         const drugs = await drug.findById(req.params.id).populate("rating")//.populate({
        //     path: "rating",
        //     model: rate }).populate({path: "owner",model:  "comment"})
         
        
        if (!drugs) return res.status(404).json("drugs is not found")
        res.json(drugs)

    } catch (error) {
        console.log(error.message)
        res.status(500).json("The problem in server")
    }
})
// edit drug
router.put("/:id", async (req, res) => {
    try {
        const { Name,termOfUse, description, image} = req.body

        //check id
        const id = req.params.id
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).send("The path is not valid")
        //check token
        const token = req.header("Authorization")
        if (!token) return res.status(401).json("token is missing")

        const decryptToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const UserId = decryptToken.id

        const user = await User.findById(UserId).select("-password")
        if (!user) return res.status(404).json("User not found")
        req.UserId = UserId
        
     const isAdmin = await User.findById(UserId)
     if (!isAdmin) return res.status(404).json("user not found")
    if (isAdmin.role!=="Admin" & isAdmin.role!=="DRA") return res.status(404).send("you are not allowed to edit Drugs!!")

        //validate
        const result = editJoi.validate(req.body)
        if (result.error) return res.status(404).json(result.error.details[0].message)

        //edit
        const drugs = await drug.findByIdAndUpdate
            (req.params.id,
                { $set: { Name, termOfUse,description, image } },
                { new: true })

        if (!drugs) return res.status(404).json("drugs not found")
     //   if (drug.owner != req.UserId) return res.status(403).json("Unauthorized action")
        res.json(drugs)
    } catch (error) {
        console.log(error.message)
        res.status(500).json("The problem in server")
    }
})
// delete drug 
router.delete("/:id", async (req, res) => {
    try {

        //check id
        const id = req.params.id
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).send("The path is not valid")

        await Comment.deleteMany({ drugsId: req.params.id })
        const drugs = await drug.findByIdAndRemove(req.params.id)
        if (!drugs) return res.status(404).json("drug not found")
      if (drugs.owner != req.userId && drugs.owner.role !="Admin") return res.status(403).json("Unauthorized action")

        await User.findByIdAndUpdate(req.userId, { $pull: { drugs: drug._id } })

        res.json(drugs)

    } catch (error) {
        console.log(error.message)
        res.status(500).json("The problem in server")
    }
})
 // add comment
router.post("/:drugId/comments", async (req, res) => {
    try {
        //check token
        const token = req.header("Authorization")
        if (!token) return res.status(401).json("token is missing")

        const decryptToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const UserId = decryptToken.id
        req.UserId = UserId

        const user = await User.findById(UserId).select("-password")
        if (!user) return res.status(404).json("User not found")

        const isConsumer = await User.findById(UserId)
        if (!isConsumer ) return res.status(404).json("user not found")
      //  if (isConsumer.role!=="Consumer") return res.status(404).send("you are not allowed to add comments ")
        
        //check id
        const id = req.params.drugId
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).send("The path is not valid object id")

        let Drug = await drug.findById(req.params._id)
        if (Drug) return res.status(404).json("drug not found")

        //validate
        const result = commentJoi(req.body)
        if (result.error) return res.status(404).json(result.error.details[0].message)

        //requset body comment
        const { comment } = req.body
        //create comment 

        const newComment = new Comment({
             comment,
              owner: req.UserId,
              Drugid: req.params.drugId,
             })
        
        await drug.findByIdAndUpdate(req.params.drugId, { $push: { comments: newComment._id } })

        await User.findByIdAndUpdate(req.UserId, { $push: { comments: newComment._id } })
        await newComment.save()
        res.json(newComment)

    } catch (error) {
        console.log(error.message)
        res.status(500).json("The problem in server")
    }
})
// delet comment 
router.delete("/:drugId/comments/:commentId", async (req, res) => {
    try {
        //check token
    

        //check id
        const drugId = req.params.drugId
        if (!mongoose.Types.ObjectId.isValid(drugId))
            return res.status(400).send("The path is not valid object id")

        //check id
        const commentId = req.params.commentId
        if (!mongoose.Types.ObjectId.isValid(commentId))
            return res.status(400).send("The path is not valid object id")

        let drugs = await drug.findById(req.params._id)
        if (drugs) return res.status(404).json("drug not found")

        const commentFound = await Comment.findById(req.params.commentId)
        if (!commentFound) return res.status(404).json("comment not found")


        //if (commentFound.owner != req.userId) return res.status(403).json("unauthorized action")
        await drug.findByIdAndUpdate(req.params.drugId, { $pull: { comments: commentFound._id } })
        await Comment.findByIdAndRemove(req.params.commentId)
        res.json("comment deleted")
    } catch (error) {
        console.log(error.message)
        res.status(500).json("The problem in server")
    }
})
// diplay comments
router.get("/:drugsId/comments", async (req, res) => {
    try {
        //check(validate) id
        const id = req.params.drugsId
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).send("The path is not valid object id")

        const drugs = await drug.findById(req.params.drugsId)
        if (!drugs) return res.status(404).json("drug not found")

        const comments = await Comment.find({ drugId: req.params.drugsId }).populate({path:"owner",model:"user"})
        res.json(comments)

    } catch (error) {
        console.log(error.message)
        res.status(500).json("The problem in server")
    }
})
//Likes
router.get("/:drugId/:commentId/likes", async (req, res) => {
    try {
        //check token
        const token = req.header("Authorization")
        if (!token) return res.status(401).json("token is missing")

        const decryptToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const userId = decryptToken.id

        const user = await User.findById(userId).select("-password")
        if (!user) return res.status(404).json("user not found")
        req.userId = userId

        const isConsumer = await User.findById(userId)
        if (!isConsumer ) return res.status(404).json("user not found")
       // if (isConsumer.role!=="Consumer" & isConsumer.role!=="Specialist") return res.status(404).send("you are not allowed like this comment ")
        
        //check(validate) id
        const id = req.params.commentId
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).send("The path is not valid object id")

        let comment = await Comment.findById(req.params.commentId)
        if (!comment) return res.status(404).json("comment not found")

        const userFound = comment.likes.find(like => like == req.userId)
        if (userFound) {
            await Comment.findByIdAndUpdate(req.params.commentId, { $pull: { likes: req.userId } })
            await User.findByIdAndUpdate(req.userId, { $pull: { like: req.params.commentId } })
            res.json("remove like")
        } else {
            await Comment.findByIdAndUpdate(req.params.commentId, { $push: { likes: req.userId  } })
            await User.findByIdAndUpdate(req.userId, { $push: { like: req.params.commentId } })
            res.json("liked post")
        }

    } catch (error) {
        console.log(error.message)
        res.status(500).json("The problem in server")
    }
})
//dislike
router.get("/:drugId/:commentId/dislikes", async (req, res) => {
    try {
        //check token
        const token = req.header("Authorization")
        if (!token) return res.status(401).json("token is missing")

        const decryptToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const userId = decryptToken.id

        const user = await User.findById(userId).select("-password")
        if (!user) return res.status(404).json("user not found")
        req.userId = userId

        const isConsumer = await User.findById(userId)
        if (!isConsumer ) return res.status(404).json("user not found")
      //  if (isConsumer.role!=="Consumer" & isConsumer.role!=="Specialist") return res.status(404).send("you are not allowed to dislike  ")
        
        //check(validate) id
        const id = req.params.commentId
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).send("The path is not valid object id")

        let comment = await Comment.findById(req.params.commentId)
        if (!comment) return res.status(404).json("comment not found")

        const userFound = comment.dislikes.find(dislike => dislike == req.userId)
        if (userFound) {
            await Comment.findByIdAndUpdate(req.params.commentId, { $pull: { dislikes: req.userId } })
            await User.findByIdAndUpdate(req.userId, { $pull: { dislike: req.params.commentId } })
            res.json("remove dislike")
        } else {
            await Comment.findByIdAndUpdate(req.params.commentId, { $push: { dislikes: req.userId  } })
            await User.findByIdAndUpdate(req.userId, { $push: { dislike: req.params.commentId } })
            res.json("disliked post")
        }

    } catch (error) {
        console.log(error.message)
        res.status(500).json("The problem in server")
    }
})
//rating 

router.post("/:drugId/rate", async (req, res) => {
    try {
        //check token
        const token = req.header("Authorization")
        if (!token) return res.status(401).json("token is missing")

        const decryptToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const userId = decryptToken.id
        req.userId = userId

        const user = await User.findById(userId).select("-password")
        if (!user) return res.status(404).json("User not found")

        const isConsumer = await User.findById(userId)
        if (!isConsumer) return res.status(404).json("user not found")
         if (isConsumer.role!=="Consumer" && isConsumer.role !== "Specialist") return res.status(400).send("you are not allowed to rate ")

        const id = req.params.drugId
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send("The path is not valid object id")
        //validate
        const result = rateJoi.validate(req.body)
        if (result.error) return res.status(404).json(result.error.details[0].message)


        let Drug = await drug.findById(req.params.drugId) 
        if (!Drug) return res.status(404).json("drug not found")

        //requset body rate
        const { rate } = req.body

        //create rate 
        const newrate = {
            rate,
            userId: req.userId
        }
        // console.log(drug.rating);
      


       const ratingFound = Drug.rating.find(ratingObject => ratingObject.userId == req.userId) 
       if (ratingFound) return res.status(400).send("شكرا لك لقد قمت بتقييم هذا الدواء سابقا")

        await drug.findByIdAndUpdate(req.params.drugId, { $push: { rating: newrate } }, { new: true })
        Drug = await drug.findByIdAndUpdate(req.params.drugId, { $push: { rating: newrate } }, { new: true })
 
        let ratingSum = 0
        Drug.rating.forEach(reationgObject => ratingSum = ratingSum + reationgObject.rate)
        const ratingAverage = ratingSum / Drug.rating.length
         await drug.findByIdAndUpdate(req.params.drugId, { $set: {  ratingAverage: ratingAverage } })

        res.send("rating added")
        console.log("rating added");
    } catch (error) {
        console.log(error.message)
        res.status(500).json("The problem in server")
    }
})
//search 
router.get("/search/:key", async (req, res) => {
 
    let data = await drug.find({
        "$or":[
            {Name:{$regex:req.params.key}}
        ]
    })
    res.send(data)
})
module.exports = router