const mongoose=require("mongoose");

async function connectDB(){
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/user-service");
        console.log("connect databse successfully");
    } catch (error) {
        console.log("failed to connect database", error);
    }
}
module.exports=connectDB;