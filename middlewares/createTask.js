const jwt = require("jsonwebtoken")

const addUserIdToTask = (req, res, next) => {
    const token = req.headers.authorization
    const payload = jwt.verify(token, process.env.SECRET)

    req.body.userId = payload._id

    next()
}

module.exports = {addUserIdToTask}