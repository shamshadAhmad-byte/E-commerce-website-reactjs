const clotheModel=require("../models/clothe.model");
const uploadToCloudinary=require("../utils/cloudinaryUpload");
const cloudinary=require("../utils/cloudinary");
const addClothe = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.json({ success: false, message: "Add file" });
    }
    const temp = [];
    const result=await uploadToCloudinary(req.files);
    result.forEach((element)=>{
        temp.push({public_id: element.public_id, url: element.secure_url});
    })
    const newclothe = new clotheModel({
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price),
      category: req.body.category,
      subCategory: req.body.subCategory,
      image: temp,
      size: req.body.sizes.split(","),
      date: Date.now(),
      bestSeller: req.body.bestSeller,
    });
    await newclothe.save();
    res.json({ success: true, message: "successful add clothe" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: " Server Error" });
  }
};
const removeClothe = async (req, res) => {
  try {
    const deleteData = await clotheModel.findById(req.body.id);
    if(!deleteData){
      return res.json({ success: false, message: "Clothe not found" });
    }
    deleteData.image.forEach(async (element) => {
      await cloudinary.uploader.destroy(element.public_id);
    });
    
    await clotheModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "remove successful" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server Error" });
  }
};
const listClothe = async (req, res) => {
  try {
    const clothe = await clotheModel.find({});
    res.json({ success: true, clothe: clothe });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server Error" });
  }
};
const getClotheById=async(req,res)=>{
  try {
    const id=req.params.id;
    if(!id){
      return res.json({success: false, message: "Clothe id is required"});
    }
    const clothe=await clotheModel.findById(id);
    if(!clothe){
      return res.json({success: false, message: "Clothe not found"});
    }
    res.json({success: true, clothe: clothe});
  } catch (error) {
    
  }
}
module.exports={addClothe,removeClothe,listClothe,getClotheById};