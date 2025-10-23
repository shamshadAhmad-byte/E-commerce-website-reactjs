
import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  originalname: String,
  mimetype: String,
  size: Number,
  url: String,
  uploadedAt: { type: Date, default: Date.now },
  userId: { type: String, required: true },
});

const Image = mongoose.model("Image", imageSchema);

export default Image;