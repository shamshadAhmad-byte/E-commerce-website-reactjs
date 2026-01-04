const express=require("express");
const {addClothe,removeClothe,listClothe}=require("../controller/clothe.controller");
const adminAuthMiddleware=require("../middleware/adminAuth.middleware");
const upload=require("../middleware/multer.middleware");

const clotheRouter=express.Router();
clotheRouter.post("/addclothe",adminAuthMiddleware,upload.array("image",5),addClothe);
clotheRouter.delete("/removeclothe",adminAuthMiddleware,removeClothe);
clotheRouter.get("/listclothe",listClothe);

module.exports=clotheRouter;