const jwt=require("jsonwebtoken");

const authMiddleware=async(req,res,next)=>{
    const {token}=req.headers;
    if(!token){
        return res.json({success: false, message: "Invalid token", });
    }
    try{
        const decode=jwt.verify(token, process.env.JWT_SECRET);
        req.userId=decode.id;
        if(!req.body) req.body={};
        req.body.userId=decode.id;
        next()
    }catch(error){
        console.log(error);
        res.json({success: false, message: "Internal server error"})
    }
}
module.exports=authMiddleware;