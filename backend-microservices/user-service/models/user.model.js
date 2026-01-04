const mongoose= require("mongoose");
const {Schema}=mongoose;

const userSchema=new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    cartData:{
        type: Object,
        default: {}
    }
})

module.exports=mongoose.models.user || mongoose.model("user", userSchema);