const express = require("express")

require("dotenv").config()
require("./config/db")

const cors = require("cors")
const app = express()

// configs
app.use(cors())
app.use(express.urlencoded({extended : false}))
app.use(express.json())

app.use("/api", require("./routes/api"))

PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Estas en el puerto ${PORT}`);
})


