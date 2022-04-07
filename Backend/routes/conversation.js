const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const { Conversation, conversationJoi } = require("../model/conversation")
const { User } = require("../model/user")
//viwe Message
router.get("/profile/:id/directMessage", async (req, res) => {
    try {
        //check token
        const token = req.header("Authorization")
        if (!token) return res.status(401).json("token is missing")

        const decryptToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const userId = decryptToken.id

        const user = await User.findById(userId).select("-password")
        if (!user) return res.status(404).json("user not found")
        req.userId = userId

        const dirMsg = await Conversation.find({
            $or: [{ sender_id: req.userId, receive_id: req.params.id },
            { sender_id: req.params.id, receive_id: req.userId }]
        })
        res.json(dirMsg)
    } catch (error) {
        console.log(error.message)
        res.status(500).json("The proplem in server")
    }
})
// send Message
router.post("/profile/:id/directMessage", async (req, res) => {
    try {
        //check token
        const token = req.header("Authorization")
        if (!token) return res.status(401).json("token is missing")

        const decryptToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const userId = decryptToken.id

        const user = await User.findById(userId).select("-password")
        if (!user) return res.status(404).json("user not found")
        req.userId = userId
        //validate
        const result = conversationJoi.validate(req.body)
        if (result.error) return res.status(400).json(result.error.details[0].message)

        const { message } = req.body
        const newMessage = new Conversation({
            message,
            sender_id: req.userId,
            receive_id: req.params.id
        })
        await newMessage.save()
        res.json(newMessage)

    } catch (error) {
        console.log(error.message)
        res.status(500).json("The proplem in server")
    }
})
module.exports = router;