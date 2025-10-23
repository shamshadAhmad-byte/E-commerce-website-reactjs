import Image from "../models/cameraModel.js";
import fs from "fs";
import path from "path";

const capture = async (req, res) => {
  try {
    if (!req.file) {
      return res.json({ success: false, message: "No image uploaded" });
    }

    const { filename, originalname, mimetype, size } = req.file;
    const userId = req.userId || req.body.userId;
    if (!userId) {
      return res.json({ success: false, message: "User not authorized" });
    }

    const image = new Image({
      filename,
      originalname,
      mimetype,
      size,
      url: `/web/images/${filename}`,
      userId,
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

export { capture, getAll, deleteImg };
