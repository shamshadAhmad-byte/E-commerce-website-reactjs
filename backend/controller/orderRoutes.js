import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
const currency = "inr";
const delivery_Fee = 50;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const origin = "http://localhost:5174";
const placedOrderCOD = async (req, res) => {
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
    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "server Error",
    });
  }
};

const placedOrderStripe = async (req, res) => {
  const { items, address, amount, origin } = req.body.orderData;
  const { userId } = req.body;
  const orderData = {
    userId,
    items,
    address,
    amount,
    payment: false,
    paymentMethod: "stripe",
  };
  try {
    const newOrder = new orderModel(orderData);
    await newOrder.save();
    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "shipping",
        },
        unit_amount: delivery_Fee * 100,
      },
      quantity: 1,
    });
    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items: line_items,
      mode: "payment",
    });
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "server Error",
    });
  }
};

// list order admin pannel

const listOrder = async (req, res) => {
  try {
    const list = await orderModel.find({});
    res.json({ success: true, orders: list });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server Error" });
  }
};

// user order display
const userOrder = async (req, res) => {
  const { userId } = req.body;
  try {
    const list = await orderModel.find({ userId });
    res.json({ success: true, data: list });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server Error" });
  }
};

// update status
const updateStatus = async (req, res) => {
  const { orderId, status } = req.body;
  try {
    await orderModel.findByIdAndUpdate(orderId, { status: status });
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server Error" });
  }
};

const varifyOrder = async (req, res) => {
  const { success, orderId, userId } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
    } else {
      await orderModel.findByIdAndDelete(orderId);
    }
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server Error" });
  }
};

export {
  placedOrderCOD,
  placedOrderStripe,
  listOrder,
  userOrder,
  updateStatus,
  varifyOrder,
};
