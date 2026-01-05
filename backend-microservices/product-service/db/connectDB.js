const mongoose=require("mongoose");
async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log("Connect database successfully");
    } catch (error) {
        console.log("Failed to connect database", error);
    }
}
module.exports=connectDB;