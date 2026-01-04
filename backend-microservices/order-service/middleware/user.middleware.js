const axios=require("axios");
const userServiceUrl="http://localhost:8001";
const userMiddleware=async (req,res, next)=>{
    try {
        const {token}=req.headers;
        if(!token){
        return res.status(401).json({success: false, message:"Unauthorized: No token provided"});
        }
        const response=await axios.get(`${userServiceUrl}/get`,{headers:{token}});
        if(response.data.success){
            req.userId=response.data.user._id;
            if(!req.body) req.body={};
            req.body.userId=response.data.user._id;
            next();
        } else{
            return res.status(401).json({success: false, message:"Unauthorized: Invalid token"});
        }
    } catch (error) {
        res.status(500).json({success: false, message: "Internal server error"});
    }
}
module.exports=userMiddleware;