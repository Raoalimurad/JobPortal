const JWT  = require("jsonwebtoken")

const isAutenticated = async(req,res,next)=>{
    const token = req.cookies.token
    try {
        if(!token){
           return res.status(401).json({
                message:"user not authorized",
                success:false
            })
        }
        const decode = await JWT.verify(token,process.env.SECRET)
        if(!decode){
            return res.status(401).json({
                message:"invalid token",
                success
            })
        }
        req.id = decode._id
        next()
    } catch (error) {
        res.status(500).json({
            message:"server error during authorization",
            success:false,
            error:error.message
        })
    }
}
module.exports = isAutenticated