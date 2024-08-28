const {model, Schema} = require("mongoose")

const userSchema = new Schema({
    username: String,
    password: String,
    imgUrl: String,
    role: {
        type: String,
        default: "user"
    }
})

module.exports = model("user", userSchema)