const jwt=require("jsonwebtoken");

const tokenGenerator=(data)=>{
    return jwt.sign({data},"alpha123");
}
const admin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === "sham123@gmail.com" && password === "sham123") {
      const token = tokenGenerator(email + password);
      res.status(200).json({ success: true, token });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
const adminAuth=async(req,res)=>{
    res.status(200).json({success: true, message: "Admin authenticated"});
}

module.exports={admin, adminAuth};