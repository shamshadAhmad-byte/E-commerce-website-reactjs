const orderModel=require("../models/order.model");
const {publishToQueue}=require("../service/rabbit");

const placedOrderCOD=async(req,res)=>{
    const { userId, items, address, amount } = req.body;
    const orderData = {
        userId,
        items,
        address,
        amount,
    };
    try {
        const newOrder = new orderModel(orderData);
        await newOrder.save();
        // await userModel.findByIdAndUpdate(userId, { cartData: {} });
        await publishToQueue("clear-cart", JSON.stringify({userId}));
        res.status(201).json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}
const placedOrderStripe=async(req,res)=>{

}

const listOrder=async(req,res)=>{
    try {
        const list = await orderModel.find({});
        res.status(200).json({ success: true, orders: list });
  } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
  }
}

const userOrder=async(req,res)=>{
const { userId } = req.body;
  try {
    const list = await orderModel.find({ userId });
    res.status(200).json({ success: true, data: list });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

const updateStatus=async(req,res)=>{
const { orderId, status } = req.body;
  try {
    await orderModel.findByIdAndUpdate(orderId, { status: status });
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

const verifyOrder=async(req,res)=>{
const { success, orderId, userId } = req.body;
  try {
    if (success === "true") {
        await orderModel.findByIdAndUpdate(orderId, { payment: true });
        publishToQueue("clear-cart", JSON.stringify({userId}));
    } else {
        await orderModel.findByIdAndDelete(orderId);
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}
module.exports={placedOrderCOD,placedOrderStripe,listOrder,userOrder,updateStatus,verifyOrder};