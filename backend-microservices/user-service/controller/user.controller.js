const userModel=require("../models/user.model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const validator=require("validator");

const tokenGenerator=(userId)=>{
    return jwt.sign({id: userId}, process.env.JWT_SECRET);
}
const userRegistration=async(req,res)=>{
    const {name, email, password}=req.body;
    try {
        if(!validator.isEmail(email)){
            return res.json({success: false, message: "Please enter a valid email"});
        }
        const existUser=await userModel.findOne({email: email});
        if(existUser){
            return res.json({success: false, message: "User already exists"})
        }
        if(password.length<8){
            return res.json({success: false, message: "please enter a strong password"});
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password, salt);
        const newUser=new userModel({name, email, password: hashedPassword});
        await newUser.save();
        const token=tokenGenerator(newUser._id);
        res.json({success: true, token: token});

    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Internal server error"});
    }
}
const userLogin=async(req,res)=>{
    const {email, password}=req.body;
    try {
        const existUser=await userModel.findOne({email: email});
        if(!existUser){
            return res.json({success: false, message: "User does not exist"});
        }
        const isPasswordMatch=await bcrypt.compare(password, existUser.password);
        if(!isPasswordMatch){
            return res.json({success: false, message: "Invalid credentials"});
        }
        const token=tokenGenerator(existUser._id);
        res.json({success: true, token: token});

    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Internal server error"});
    }

}
const userUpdate=async(req,res)=>{
    try {
        if(req.body.name){
            await userModel.findByIdAndUpdate(userId, {name: req.body.name});
        }
        if(req.body.email){
            if(!validator.isEmail(req.body.email)){
                return res.json({success: false, message: "Please enter a valid email"});
            }
            await userModel.findByIdAndUpdate(userId, {email: req.body.email});
        }
        if(req.body.password){
            if(req.body.password.length<8){
                return res.json({success: false, message: "please enter a strong password"});
            }
            const salt=await bcrypt.genSalt(10);
            const hashedPassword=await bcrypt.hash(req.body.password, salt);
            await userModel.findByIdAndUpdate(userId, {password: hashedPassword});
        }
        res.json({success: true, message: "User updated successfully"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Internal server error"});
    }

}
const userGet=async(req,res)=>{
    try{
        const userExist=await userModel.findById(req.userId);
        if(!userExist){
            return res.json({success: false, message: "user not found"});
        }
        res.json({success: true, user: userExist});
    }catch(error){
        console.log(error);
        res.json({success: false, message: "Internal server error"});
    }
}

module.exports={userRegistration, userLogin,userUpdate, userGet};