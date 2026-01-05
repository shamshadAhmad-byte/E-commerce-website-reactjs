const express=require("express");
const cartRouter=express.Router();
const {addCart,getCart,updateCart,deleteCart}=require("../controller/cartData.controller");
const authMiddleware=require("../middleware/auth.middleware");


cartRouter.post("/addcart",authMiddleware,addCart);
cartRouter.get("/getcart",authMiddleware,getCart);
cartRouter.put("/updatecart",authMiddleware,updateCart);
cartRouter.delete("/deletecart",authMiddleware,deleteCart);

module.exports=cartRouter;