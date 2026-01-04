const mongoose=require("mongoose");
async function connectDB(){
    try {
        await mongoose.connect("mongodb://localhost:27017/product-service");
        console.log("Connect database successfully");
    } catch (error) {
        console.log("Failed to connect database", error);
    }
}
module.exports=connectDB;