// middleware/cloudinary.js
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const sharp = require("sharp");
const sizeOf = require("image-size");

cloudinary.config({
  cloud_name: "rl_cloudinary_name",
  api_key: "739952797731475",
  api_secret: "ZKQrFcUwiEYieudZpseBke3j1jE",
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const MAX_WIDTH = 720;
const MAX_HEIGHT = 720;
const MAX_SIZE = 300 * 1024; // 300kb

const resizeAndCompress = (buffer) => {
  return sharp(buffer)
    .resize(MAX_WIDTH, MAX_HEIGHT, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 80 })
    .toBuffer();
};

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ resource_type: "auto" }, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      })
      .end(buffer);
  });
};

const uploadMiddleware = async (req, res, next) => {
  try {
    const file = req.file;

    const dimensions = sizeOf(file.buffer);
    const aspectRatio = dimensions.width / dimensions.height;
    let width = Math.min(dimensions.width, MAX_WIDTH);
    let height = Math.min(dimensions.height, MAX_HEIGHT);

    if (width / aspectRatio > MAX_HEIGHT) {
      width = MAX_HEIGHT * aspectRatio;
    } else {
      height = MAX_WIDTH / aspectRatio;
    }

    const compressedBuffer = await resizeAndCompress(file.buffer);

    if (compressedBuffer.length > MAX_SIZE) {
      throw new Error("Image size too large");
    }

    req.cloudinaryUrl = await uploadToCloudinary(compressedBuffer);
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Upload failed" });
  }
};

module.exports = { uploadMiddleware };
