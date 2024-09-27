const mainRouter = require("express").Router();
const artworkRouter = require("./artwork");
const galleryRouter = require("./gallery");

mainRouter.use("/galleries", galleryRouter);
mainRouter.use("/artworks", artworkRouter);

module.exports = mainRouter;
