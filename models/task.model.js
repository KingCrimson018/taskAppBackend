const { model, Schema } = require("mongoose")

const taskSchema = new Schema({
    userId: String,
    title: String,
    description: String,
    imgUrl: String
})

module.exports = model("task", taskSchema)