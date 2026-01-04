const express=require("express");
const cartRouter=express.Router();
const {addCart,getCart,updateCart,deleteCart}=require("../controller/cartData.controller");
const authMiddleware=require("../middleware/auth.middleware");

cartRouter.use(authMiddleware);

cartRouter.post("/addcart",addCart);
cartRouter.get("/getallcart",getCart);
cartRouter.put("/updatecart",updateCart);
cartRouter.delete("/deletecart",deleteCart);

module.exports=cartRouter;