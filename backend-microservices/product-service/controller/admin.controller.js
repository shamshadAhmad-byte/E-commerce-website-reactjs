const jwt=require("jsonwebtoken");

const tokenGenerator=(data)=>{
    return jwt.sign({data},process.env.JWT_SECRET_KEY);
}
const admin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = tokenGenerator(email + password);
      res.json({ success: true, token });
    } else {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server Error" });
  }
};
const adminAuth=async(req,res)=>{
    res.json({success: true, message: "Admin authenticated"});
}

module.exports={admin, adminAuth};