const galleryRouter = require("express").Router();
const {
  getGalleries,
  getGalleryById,
  postGallery,
  putGallery,
  deleteGallery
} = require("../controllers/gallery");

/* const { uploadGalleries } = require("../../middlewares/file"); */
const { uploadImg } = require("../../middlewares/file");

galleryRouter.get("/", getGalleries);
galleryRouter.get("/:id", getGalleryById);
galleryRouter.post("/", uploadImg("galleries").single("imgUrl"), postGallery);
galleryRouter.put("/:id", uploadImg("galleries").single("imgUrl"), putGallery);
galleryRouter.delete("/:id", deleteGallery);

module.exports = galleryRouter;
