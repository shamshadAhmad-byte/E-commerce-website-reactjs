import Image from "../models/cameraModel.js";
import clotheModel from "../models/clotheModel.js";
import fs from "fs";
import path from "path";
import FormData from "form-data";
import axios from "axios";

const capture = async (req, res) => {
  try {
    if (!req.file) {
      return res.json({ success: false, message: "No image uploaded" });
    }

    const { filename, originalname, mimetype, size } = req.file;
    const { clotheId } = req.body;
    const userId = req.userId || req.body.userId;
    if (!userId) {
      return res.json({ success: false, message: "User not authorized" });
    }
    if(!clotheId){
      return res.json({ success: false, message: "Clothe ID is required" });
    }
    const clotheImg= await clotheModel.findById(clotheId);
    if(!clotheImg){
      return res.json({success: false, message: "Clothe Image not found"});
    }
    const image = new Image({
      filename,
      originalname,
      mimetype,
      size,
      url: `/web/images/${filename}`,
      userId,
      clotheImg: `${clotheImg.image[0]}`
    });
    await image.save();
    res.json({ success: true, message: "Image saved to DB" , image});
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Server Error" });
  }
};

const getAll = async (req, res) => {
  try {
    const images = await Image.find().sort({ uploadedAt: -1 });
    res.json({ success: true, images });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Server Error" });
  }
};

const deleteImg = async (req, res) => {
  try {
  const userId = req.userId || req.body.userId;

    if (!userId) {
      return res.json({ success: false, message: "Provide user id" });
    }
    const images = await Image.find({ userId });
    if (!images || images.length === 0) {
      return res.json({ success: false, message: "No images found for this user" });
    }
    for (const image of images) {
      const filePath = path.join(process.cwd(), "camera-img", image.filename);
      fs.unlink(filePath, (err) => {
        if (err) console.error(`Failed to delete file ${filePath}:`, err.message);
      });
    }

    await Image.deleteMany({ userId });

    res.json({
      success: true,
      message: "All user images deleted successfully",
      deletedCount: images.length,
      deletedIds: images.map((img) => img._id),
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Server Error" });
}
};
const aiModel = async (req, res) => {
  try {
    const { personId } = req.body || {};
    if (!personId) {
      return res.status(400).json({ error: "personId is required" });
    }

    const person = await Image.findById(personId);
    if (!person) {
      return res.status(404).json({ error: "Person record not found" });
    }

    const personImgData = person.filename;
    const clotheImgData = person.clotheImg;
    if (!personImgData) {
      return res.status(404).json({ error: "Person image filename missing in DB" });
    }
    if (!clotheImgData) {
      return res.status(404).json({ error: "Clothe image filename missing in DB" });
    }

    const personPath = path.join(process.cwd(), "camera-img", personImgData);
    const clothPath = path.join(process.cwd(), "uploads", clotheImgData);
    if (!fs.existsSync(personPath)) {
      return res.status(404).json({ error: "Person image file not found", path: personPath });
    }
    if (!fs.existsSync(clothPath)) {
      return res.status(404).json({ error: "Clothe image file not found", path: clothPath });
    }

    const formData = new FormData();
    formData.append("person", fs.createReadStream(personPath));
    formData.append("cloth", fs.createReadStream(clothPath));

    const flaskUrl = process.env.VITON_URL || "http://127.0.0.1:5000/tryon";
    const flaskRes = await axios.post(flaskUrl, formData, {
      headers: formData.getHeaders(),
      responseType: "arraybuffer",
      maxBodyLength: Infinity,
    });

    const ct = flaskRes.headers && flaskRes.headers["content-type"];
    if (flaskRes.status !== 200) {
      const text = ct && ct.includes("application/json") ? Buffer.from(flaskRes.data).toString() : `status ${flaskRes.status}`;
      throw new Error(`Flask error: ${text}`);
    }
    if (ct && ct.includes("application/json")) {
      const message = Buffer.from(flaskRes.data).toString();
      console.error("Flask returned JSON:", message);
      throw new Error(`Flask did not return image data: ${message}`);
    }
    const buffer = Buffer.from(flaskRes.data);
    res.set("Content-Type", ct || "image/jpeg");
    return res.send(buffer);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Try-on failed", details: err.message });
  }
};
export { capture, getAll, deleteImg, aiModel };
