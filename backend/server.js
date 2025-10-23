import express from "express";
import http from "http";
import cors from "cors";
import { connectDb } from "./db/connect.js";
import "dotenv/config";
import userRoute from "./router/userRoute.js";
import clotheRouter from "./router/clotheRouter.js";
import cartRouter from "./router/cartRouter.js";
import orderRouter from "./router/orderRouter.js";
import cameraRouter from "./router/cameraCapture.js";
// app config
const app = express();
// db connect
connectDb();

const port = process.env.PORT || 3000;
// middleware
app.use(cors());
// If you need to restrict origins:

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// end points
app.use("/web/order", orderRouter);
app.use("/web/cart", cartRouter);
app.use("/web/clothe", clotheRouter);
app.use("/images", express.static("uploads"));
app.use("/web/user", userRoute);
app.use('/web/camera', cameraRouter);
app.use('/web/images', express.static("camera-img"));
app.get("/", (req, res) => {
  res.send("hello");
});

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`server is running on port no ${port}`);
});
