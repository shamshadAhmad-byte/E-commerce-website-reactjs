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

app.use("/api/user", proxy("http://localhost:8001", {
    proxyReqPathResolver: (req)=>{
        req.originalUrl = req.originalUrl.replace("/api/user", "");
        return req.originalUrl;
    }
}));
app.use("/api/product", proxy("http://localhost:8002",{
    proxyReqPathResolver: (req)=>{
        req.originalUrl = req.originalUrl.replace("/api/product", "");
        return req.originalUrl;
    }
}));
app.use("/api/order", proxy("http://localhost:8003", {
    proxyReqPathResolver: (req)=>{
        req.originalUrl = req.originalUrl.replace("/api/order", "");
        return req.originalUrl;
    }
}));


server.listen(8000,()=>{
    console.log("API Gateway running on port 8000")
})