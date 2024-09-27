const cloudinary = require("cloudinary").v2;

const deleteFile = (imgUrl) => {
  console.log(imgUrl);
  const imgUrlSplited = imgUrl.split("/");
  const folderName = imgUrlSplited.at(-2);
  const fieldName = imgUrlSplited.at(-1).split(".");

  const public_id = `${folderName}/${fieldName[0]}`;

  cloudinary.uploader.destroy(public_id, () => {
    console.log("Image removed from Cloudinary 🔥");
  });
};

module.exports = { deleteFile };
