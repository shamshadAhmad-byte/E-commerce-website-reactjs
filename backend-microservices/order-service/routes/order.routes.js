const express=require("express");
const {placedOrderCOD,placedOrderStripe,listOrder,userOrder,updateStatus,verifyOrder}=require("../controller/order.controller");
const userMiddleware=require("../middleware/user.middleware");
const adminMiddleware=require("../middleware/admin.middleware")

const orderRouter=express.Router();
//order placed status
orderRouter.post("/place-order-cod",userMiddleware,placedOrderCOD);
orderRouter.post("/place-order-stripe",userMiddleware,placedOrderStripe);

// list of orders
orderRouter.get("/list-orders",adminMiddleware,listOrder);

// list display frontend
orderRouter.get("/user-orders/",userMiddleware,userOrder);

//verify and update order status
orderRouter.put("/update-status/",adminMiddleware,updateStatus);
orderRouter.post("/verify-order",userMiddleware,verifyOrder);

module.exports=orderRouter;