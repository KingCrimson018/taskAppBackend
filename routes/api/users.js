const router = require("express").Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("../../models/user.model")
const { checkToken } = require("../../middlewares/checkToken")

router.get("/", checkToken, async (req, res) => {
    try {
        console.log(req);
        const users = await User.find()
        return res.json(users)
    } catch (error) {
        console.log(error);
    }
})

router.get("/:userId", async (req, res) => {
    try {
        const {userId} = req.params
        const user = await User.findById(userId)
        return res.json(user)
    } catch (error) {
        console.log(error);
    }
})

router.post("/", async (req, res) => {
    try {
        const user = req.body
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(user.password,salt)
        user.password = hashedPassword
        const newUser = await User.create(user)
        return res.json({token : generateToken(newUser)})
    } catch (error) {
        console.log(error);
    }
})

router.put("/:userId", async (req, res) => {
    try {
        const {userId} = req.params
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, {new : true})
        return res.json({token: generateToken(updatedUser)})
    } catch (error) {
        console.log(error);
    }
})

router.delete("/:userId", async (req, res) => {
    try {
        const {userId} = req.params
        const deletedUser = await User.findByIdAndDelete(userId)
        return res.json(deletedUser)
    } catch (error) {
        console.log(error);
    }
})

router.post("/signin", async (req, res) => {
    try {
        const user = await User.find({username : req.body.username})

        if(user.length == 0) {
            return res.json({message : "No user Found"})
        }

        if(await bcrypt.compare(req.body.password, user[0].password)){
            return res.json({token: generateToken(user[0])})
        }else{
            return res.json({message : "Password Incorrect"})
        }

    } catch (error) {
        console.error(error);
    }
})

function generateToken(user) {

    const payload = {
        username: user.username,
        _id: user._id,
        role: user.role,
        imgUrl: user.imgUrl
    }
    const token = jwt.sign(payload, process.env.SECRET)
    return token
}

module.exports = router