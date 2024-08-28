const router = require("express").Router()

const { checkToken } = require("../../middlewares/checkToken")
const { addUserIdToTask } = require("../../middlewares/createTask")
const Task = require("../../models/task.model")

router.get("/", checkToken, async (req, res) => {
    try {
        
        if(req.payload.role == "admin") {
            const tasks = await Task.find()
            return res.json(tasks)
        }else{
            const tasks = await Task.find({userId : req.payload._id})
            return res.json(tasks)
        }

    } catch (error) {
        console.log(error);
    }
})

router.get("/:taskId", async (req, res) => {
    try {
        const {taskId} = req.params
        const task = await Task.findById(taskId)
        return res.json(task)
    } catch (error) {
        console.log(error);
    }
})

router.post("/", addUserIdToTask, async (req, res) => {
    try {
        const task = await Task.create(req.body)
        return res.json(task)
    } catch (error) {
        console.log(error);
    }
})

router.put("/:taskId", async (req, res) => {
    try {
        const {taskId} = req.params
        const updateTask = req.body
        const task = await Task.findByIdAndUpdate(taskId, updateTask)
        return res.json(task)
    } catch (error) {
        console.log(error);
    }
})

router.delete("/:taskId", async (req, res) => {
    try {
        const {taskId} = req.params
        const deletedTask = await Task.findByIdAndDelete(taskId)
        return res.json(deletedTask)
    } catch (error) {
        console.log(error);
    }
})

module.exports = router