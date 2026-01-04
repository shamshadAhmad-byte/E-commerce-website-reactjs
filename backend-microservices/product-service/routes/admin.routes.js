const express=require("express");
const {admin,adminAuth}=require("../controller/admin.controller");
const adminAuthMiddleware=require("../middleware/adminAuth.middleware");
const router=express.Router();

router.post("/",admin);
router.get("/auth",adminAuthMiddleware,adminAuth);
module.exports=router;