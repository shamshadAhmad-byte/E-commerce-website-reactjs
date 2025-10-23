import jwt from "jsonwebtoken";
const userAuth = async (req, res, next) => {
  const { token } = req.headers;
  try {
    if (!token) return res.json({ success: false, message: "token is not authorized" });
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = token_decode.id;
    if (!req.body) req.body = {};
    if (!req.body.userId) req.body.userId = token_decode.id;
    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
export default userAuth;
