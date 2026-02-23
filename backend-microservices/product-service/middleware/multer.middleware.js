const multer=require("multer");

const storage = multer.memoryStorage();

const checkFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images"));
  }
};
const upload = multer({
  storage: storage,
  fileFilter: checkFileFilter,
  limits: {
    fileSize: 1024 * 1024 * 10, // 10 MB
  },
});
module.exports = upload;