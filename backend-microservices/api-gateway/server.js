const http=require("http");
const express=require("express");
const rateLimit=require("express-rate-limit");
const helmet=require("helmet");
const cors=require("cors");
const proxy=require("express-http-proxy");

const app=express();
const server=http.createServer(app);

app.use(cors());
app.use(helmet());

const limiter=rateLimit({
    windowMs: 15*60*1000,
    max: 100,
    message: "To many requests from this IP, Please try again after 15 minutes",
    statusCode: 429
})
app.use(limiter);

app.use("/api/user", proxy("http://localhost:8001"));
app.use("/api/product", proxy("http://localhost:8002"));
app.use("/api/order", proxy("http://localhost:8003"));


server.listen(8000,()=>{
    console.log("API Gateway running on port 8000")
})