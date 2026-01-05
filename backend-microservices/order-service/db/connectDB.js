const mongoose=require("mongoose");
async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log("Connected to Order Service Database");
    } catch (error) {
        console.log(error);
    }
}
module.exports=connectDB;