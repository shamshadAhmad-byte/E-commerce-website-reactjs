const express=require("express");
const {userRegistration, userLogin,userUpdate, userGet}=require("../controller/user.controller");
const authMiddleware=require("../middleware/auth.middleware")

const userRouter=express.Router();
userRouter.post("/register",userRegistration);
userRouter.post("/login", userLogin);
userRouter.put("/update", authMiddleware, userUpdate);
userRouter.get("/get", authMiddleware, userGet);

module.exports=userRouter;