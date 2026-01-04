const clotheModel=require("../models/clothe.model");
const fs=require("fs");
const addClothe = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(404).json({ success: false, message: "Add file" });
    }
    const temp = req.files.map((information) => information.filename);
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
    res.status(201).json({ success: true, message: "successful add clothe" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: " Server Error" });
  }
};
const removeClothe = async (req, res) => {
  try {
    const deleteData = await clotheModel.findById(req.body.id);
    deleteData.image.forEach((element) => {
      fs.unlink(`uploads/${element}`, () => {});
    });
    await clotheModel.findByIdAndDelete(req.body.id);
    res.status(200).json({ success: true, message: "remove successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
const listClothe = async (req, res) => {
  try {
    const clothe = await clotheModel.find({});
    res.status(200).json({ success: true, clothe: clothe });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
const getClotheById=async(req,res)=>{
  try {
    const id=req.params.id;
    if(!id){
      return res.status(400).json({success: false, message: "Clothe id is required"});
    }
    const clothe=await clotheModel.findById(id);
    if(!clothe){
      return res.status(404).json({success: false, message: "Clothe not found"});
    }
    res.status(200).json({success: true, clothe: clothe});
  } catch (error) {
    
  }
}
module.exports={addClothe,removeClothe,listClothe,getClotheById};