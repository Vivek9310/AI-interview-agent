import jwt from "jsonwebtoken"


const isAuth=async (req,res,next) => {
    try {
        let {token}=req.cookies

        if(!token){
            return res.status(400).json({message:"user does not have token"})
        }

        const verifyToken=jwt.verify(token,process.env.JWT_SECRET)

         if(!verifyToken){
            return res.status(400).json({message:"user does not have valid token"})
        }

        // link to understand-->https://chatgpt.com/share/6ada2d26-6a2c-83ee-85ca-01e5d57eae8f
        req.userId= verifyToken.userId
        next()

    } catch (error) {
        return res.status(500).json({message:`Isauth error ${error}`})
    }
}

export default isAuth