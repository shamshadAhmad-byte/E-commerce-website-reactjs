const http=require("http");
const express=require("express");
const dotenv=require("dotenv");
dotenv.config();
const connectDB=require("./db/connectDB");
const userRoutes=require("./routes/user.routes");
const cartRouter=require("./routes/cartData.routes");
const rabbitMQ=require("./service/rabbit");

const app=express();
const server=http.createServer(app);



app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/",userRoutes);
app.use("/cart",cartRouter);
async function startServer(){
    try {
        await connectDB();
        await rabbitMQ.connect();
        server.listen(8001, ()=>{
            console.log("User service is running on port 8001");
        })
    } catch (error) {
        console.error("Failed to start User Service:", error.message);
        process.exit(1);
    }
}

startServer();