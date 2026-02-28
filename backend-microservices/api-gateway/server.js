const http=require("http");
const express=require("express");
const rateLimit=require("express-rate-limit");
const helmet=require("helmet");
const cors=require("cors");
const proxy=require("express-http-proxy");

const app=express();
const server=http.createServer(app);
const whitelist=["http://localhost:5174", "http://localhost:5173"]
app.use(cors({
  origin: (origin,callback)=>{
    if(whitelist.indexOf(origin)!==-1 || !origin){
      callback(null,true);
    }else{
      callback(new Error("Not allowed by CORS"));
    }
  }, // your frontend
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "token"]
}));
app.use(helmet());

const limiter=rateLimit({
    windowMs: 15*60*1000,
    max: 100,
    message: "To many requests from this IP, Please try again after 15 minutes",
    statusCode: 429
})
app.use(limiter);

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || "http://user-service:8001";
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || "http://product-service:8002";
const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL || "http://order-service:8003";

app.use("/api/user", proxy(USER_SERVICE_URL, {
    proxyReqPathResolver: (req)=>{
        req.originalUrl = req.originalUrl.replace("/api/user", "");
        return req.originalUrl;
    }
}));

app.use("/api/product", proxy(PRODUCT_SERVICE_URL,{
    proxyReqPathResolver: (req)=>{
        req.originalUrl = req.originalUrl.replace("/api/product", "");
        return req.originalUrl;
    }
}));

app.use("/api/order", proxy(ORDER_SERVICE_URL, {
    proxyReqPathResolver: (req)=>{
        req.originalUrl = req.originalUrl.replace("/api/order", "");
        return req.originalUrl;
    }
}));
app.get("/", (req,res)=>{
    res.send("Welcome to API Gateway");
})

server.listen(8000,()=>{
    console.log("API Gateway running on port 8000")
})