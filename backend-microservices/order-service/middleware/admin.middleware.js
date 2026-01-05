const axios=require("axios");
const productServiceUrl="http://localhost:8002";
const adminMiddleware = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.json({ success: false, message: "Access denied. No token provide"});
        }
        const response=await axios.get(`${productServiceUrl}/admin/auth`,{headers:{token}});
        if (!response.data.success) {
            return res.json({ success: false, message: "Access denied. Admins only." });
        }
        next();
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: "Internal server error" });
    }
};

module.exports = adminMiddleware;