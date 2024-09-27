const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

/* const upload = (folder) => {
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: folder,
      allowedFormats: ["webp", "jpg", "jpeg", "png", "gif"]
    }
  });

  return multer({ storage: storage });
};

const uploadGalleries = upload("galleries");
const uploadArtworks = upload("artworks");

module.exports = {
  uploadGalleries,
  uploadArtworks
}; */

const uploadImg = (folderName) =>
  multer({
    storage: new CloudinaryStorage({
      cloudinary: cloudinary,
      params: {
        folder: folderName,
        allowedFormats: ["jpg", "png", "jpeg", "gif", "webp"]
      }
    })
  });

module.exports = { uploadImg };
