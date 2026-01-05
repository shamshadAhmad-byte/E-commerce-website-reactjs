const http=require("http");
const express=require("express");
const dotenv=require("dotenv");
dotenv.config();
const connectDB=require("./db/connectDB");
const router=require("./routes/admin.routes");
const clotheRouter=require("./routes/clothe.routes");
const rabbitMQ=require("./service/rabbit");

const app=express();
const server=http.createServer(app);
connectDB();
rabbitMQ.connect();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/admin", router);
app.use("/clothes", clotheRouter);
app.use("/images", express.static("uploads"));

server.listen(8002,()=>{
    console.log("Product Service is running on port 8002");
})