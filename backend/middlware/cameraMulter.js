import multer from "multer";
import path from "path";
import fs from "fs";

if(!fs.existsSync("camera-img")){
    fs.mkdirSync("camera-img");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "camera-img/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const checkFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images"));
  }
};
const cameraImg = multer({
  storage: storage,
  fileFilter: checkFileFilter,
});
export default cameraImg;