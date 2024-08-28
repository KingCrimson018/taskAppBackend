const router = require("express").Router()

router.use("/users", require("./api/users"))
router.use("/tasks", require("./api/tasks"))

module.exports = router