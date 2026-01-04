const userModel=require("../models/user.model");
const {subscribeToQueue}=require("../service/rabbit");

const addCart=async(req,res)=>{
    const {itemId,size,userId}=req.body;
    try {
        const userData=await userModel.findById(userId);
        if(!userData){
            return res.status(404).json({success: false,message:"user not found"});
        }
        const cartData=await userData.cartData;
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1;
            }else{
                cartData[itemId][size]=1;
            }
        }else{
            cartData[itemId]={};
            cartData[itemId][size]=1;
        }
        await userModel.findByIdAndUpdate(userId,{cartData: cartData});
        res.status(200).json({success:true,message:"item added to cart"});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false,message: "Internal server error"});
    }
}
const getCart=async(req,res)=>{
    const {userId}=req.body;
    try {
        const userData=await userModel.findById(userId);
        if(!userData){
            return res.status(404).json({success: false,message:"user not found"});
        }
        const cartData=await userData.cartData;
        res.status(200).json({success: true, cartData: cartData});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "internal server error"});
    }
}
const updateCart=async(req,res)=>{
    try {
        const {userId,itemId,size,quantity}=req.body;
        const userData=await userModel.findById(userId);
        const cartData=await userData.cartData;
        if(cartData[itemId]){
            if(cartData[itemId][size]>0){
                cartData[itemId][size]=quantity;
            }
        }
        await userModel.findByIdAndUpdate(userId,{cartData: cartData});
        res.status(200).json({success: true, message: "cart updated successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Internal server error"});
    }

}
const deleteCart=async(req,res)=>{
    try {
        const {userId,itemId,size}=req.body;
        const userData=await userModel.findById(userId);
        const cartData= await userData.cartData;
        if(Object.keys(cartData[itemId]).length>1){
            delete cartData[itemId][size];
        }
        else if(Object.keys(cartData[itemId]).length==1){
            delete cartData[itemId];
        }
        await userModel.findByIdAndUpdate(userId,{cartData: cartData});
        res.status(200).json({success: true, message: "item deleted from cart"});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Internal server error"});
    }
}

const clearCart=async(userId)=>{
    await userModel.findByIdAndUpdate(userId, { cartData: {}});
}

subscribeToQueue("clear-cart",(data)=>{
    const {userId}=JSON.parse(data);
    clearCart(userId);
})

module.exports={addCart,getCart,updateCart,deleteCart};