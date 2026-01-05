const jwt=require("jsonwebtoken");
const adminAuth=async(req,res,next)=>{
    try {
        const {token}=req.headers;
        if(!token){
            return res.json({success: false, message: "Access denied. No token provided."});
        }
        const decode=jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(decode.data!==process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
            return res.json({success: false, message: "Access denied. Invalid token."});
        }
        next();
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Internal server error"});
    }
}
module.exports=adminAuth;