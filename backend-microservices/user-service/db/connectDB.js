const mongoose=require("mongoose");

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log("connect databse successfully");
    } catch (error) {
        console.log("failed to connect database", error);
    }
}
module.exports=connectDB;