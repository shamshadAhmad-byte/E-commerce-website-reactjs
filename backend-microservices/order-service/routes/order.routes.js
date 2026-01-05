const express=require("express");
const {placedOrderCOD,placedOrderStripe,listOrder,userOrder,updateStatus,verifyOrder}=require("../controller/order.controller");
const userMiddleware=require("../middleware/user.middleware");
const adminMiddleware=require("../middleware/admin.middleware")

const orderRouter=express.Router();
//order placed status
orderRouter.post("/placeordercod",userMiddleware,placedOrderCOD);
orderRouter.post("/placeorderstripe",userMiddleware,placedOrderStripe);

// list of orders
orderRouter.get("/listorders",adminMiddleware,listOrder);
// list display frontend
orderRouter.get("/userorder",userMiddleware,userOrder);

//verify and update order status
orderRouter.put("/updatestatus",adminMiddleware,updateStatus);
orderRouter.post("/verifyorder",userMiddleware,verifyOrder);

module.exports=orderRouter;