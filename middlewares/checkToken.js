const jwt = require("jsonwebtoken")

const checkToken = (req, res, next) => {
    try {
        const token = req.headers.authorization

        if(token == undefined) {
            return res.json({message: "No Token"})
        }

        const payload = jwt.verify(token,process.env.SECRET)


        req.payload = payload

        next()
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = {checkToken}