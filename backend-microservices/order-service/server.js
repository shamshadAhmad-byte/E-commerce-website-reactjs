const http=require("http");
const express=require("express");
const connectDB=require("./db/connectDB");
const orderRouter=require("./routes/order.routes");
const rabbitMQ=require("./service/rabbit");

const app=express();

const server=http.createServer(app);
connectDB();
rabbitMQ.connect();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/",orderRouter);

server.listen(8003,()=>{
    console.log("Order Service is running on port 8003");
})