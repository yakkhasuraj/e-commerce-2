const { v2: cloudinary } = require("cloudinary");
const {
  cloudinaryCloudName,
  cloudinaryApiKey,
  cloudinaryApiSecretKey,
} = require("../configs/env.variables");

cloudinary.config({
  cloud_name: cloudinaryCloudName,
  api_key: cloudinaryApiKey,
  api_secret: cloudinaryApiSecretKey,
});

const uploadToCloud = (file, options) =>
  new Promise((resolve, reject) =>
    cloudinary.uploader.upload(file, options, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    })
  );

module.exports = uploadToCloud;
