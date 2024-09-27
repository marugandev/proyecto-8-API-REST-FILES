const artworkRouter = require("express").Router();
const {
  getArtworks,
  getArtworkById,
  postArtwork,
  putArtwork,
  deleteArtwork
} = require("../controllers/artwork");

/* const { uploadArtworks } = require("../../middlewares/file"); */
const { uploadImg } = require("../../middlewares/file");

artworkRouter.get("/", getArtworks);
artworkRouter.get("/:id", getArtworkById);
artworkRouter.post("/", uploadImg("artworks").single("imgUrl"), postArtwork);
artworkRouter.put("/:id", uploadImg("artworks").single("imgUrl"), putArtwork);
artworkRouter.delete("/:id", deleteArtwork);

module.exports = artworkRouter;
