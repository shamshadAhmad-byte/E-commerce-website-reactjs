const http=require("http");
const express=require("express");
const dotenv=require("dotenv");
dotenv.config();
const connectDB=require("./db/connectDB");
const orderRouter=require("./routes/order.routes");
const rabbitMQ=require("./service/rabbit");
const { start } = require("repl");

const app=express();

const server=http.createServer(app);


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/",orderRouter);
async function startServer(){
    try {
        await connectDB();
        await rabbitMQ.connect();
        server.listen(8003,()=>{
            console.log("Order Service is running on port 8003");
        })
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
}
startServer();