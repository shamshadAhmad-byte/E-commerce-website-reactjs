const http=require("http");
const express=require("express");
const connectDB=require("./db/connectDB");
const userRoutes=require("./routes/user.routes");
const cartRouter=require("./routes/cartData.routes");
const rabbitMQ=require("./service/rabbit");

const app=express();
const server=http.createServer(app);
connectDB();
rabbitMQ.connect();


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/",userRoutes);
app.use("/cart",cartRouter);

server.listen(8001, ()=>{
    console.log("User service is running on port 8001");
})