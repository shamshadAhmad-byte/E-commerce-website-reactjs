const jwt=require("jsonwebtoken");

const authMiddleware=async(req,res,next)=>{
    const {token}=req.headers;
    if(!token){
        return res.status(404).json({success: false, message: "Invalid token"});
    }
    try{
        const decode=jwt.verify(token, 'alpha123');
        req.userId=decode.id;
        if(!req.body) req.body={};
        req.body.userId=decode.id;
        next()
    }catch(error){
        console.log(error);
        res.status(500).json({success: false, message: "Internal server error"})
    }
}
module.exports=authMiddleware;