// pages/api/destroy-image.js
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "dfez6bupb",
  api_key: "739952797731475",
  api_secret: "ZKQrFcUwiEYieudZpseBke3j1jE",
});

export default async function handler(req, res) {
  const { publicId } = req.body;
  console.log("public id ", publicId);

  try {
    // Utilisation de l'API Cloudinary pour détruire l'image
    const response = await cloudinary.v2.uploader.destroy(publicId);
    res.status(200).json({
      message: "Image destroyed successfully",
      success: true,
      response,
    });
  } catch (error) {
    console.error("Error destroying image:", error);
    res.status(500).json({
      success: false,
      message: "Error destroying image",
      error: error.message,
    });
  }
}
