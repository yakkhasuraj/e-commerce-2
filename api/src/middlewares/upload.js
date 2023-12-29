// const path = require("node:path");
const multer = require("multer");
const HttpException = require("../utils/http.exception");

// const diskStorage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (req, { originalname }, cb) => {
//     const extension = path.extname(originalname);
//     const file = path.basename(originalname, extension);
//     cb(null, `${file}-${Date.now()}${extension}`);
//   },
// });

const memoryStorage = multer.memoryStorage();

const imageFilter = (req, file, cb) => {
  try {
    // const fileType = /jpeg|jpg|png/;
    // const isAcceptedFile = fileType.test(
    //   path.extname(file.originalname).toLowerCase()
    // );
    const isAcceptedFile = file.mimetype.startsWith("image");
    if (!isAcceptedFile)
      throw new HttpException(400, "Please use a valid image");

    return cb(null, true);
  } catch (error) {
    cb(error);
  }
};

const upload = multer({
  storage: memoryStorage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
});

module.exports = upload;
