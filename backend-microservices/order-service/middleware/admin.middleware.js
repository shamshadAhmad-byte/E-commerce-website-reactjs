const axios=require("axios");
const productServiceUrl="http://localhost:8002";
const adminMiddleware = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.status(401).json({ success: false, message: "Access denied. No token provide"});
        }
        const response=await axios.get(`${productServiceUrl}/product/admin/auth`,{headers:{token}});
        if (!response.data.success) {
            return res.status(403).json({ success: false, message: "Access denied. Admins only." });
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = adminMiddleware;