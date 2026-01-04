const jwt=require("jsonwebtoken");
const adminAuth=async(req,res,next)=>{
    try {
        const {token}=req.headers;
        if(!token){
            return res.status(401).json({success: false, message: "Access denied. No token provided."});
        }
        const decode=jwt.verify(token,"alpha123");
        if(decode.data!=="sham123@gmail.com"+"sham123"){
            return res.status(401).json({success: false, message: "Access denied. Invalid token."});
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Internal server error"});
    }
}
module.exports=adminAuth;