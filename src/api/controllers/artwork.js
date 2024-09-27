const Artwork = require("../models/artWork");
const { deleteFile } = require("../../utils/functions/deleteFile");

const getArtworks = async (req, res, next) => {
  try {
    const artworks = await Artwork.find().populate("gallery");

    /*    console.log(artworks); */

    return res.status(200).json(artworks);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getArtworkById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const artwork = await Artwork.findById(id).populate("gallery");

    /*     console.log(artwork); */

    return res.status(200).json(artwork);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const postArtwork = async (req, res, next) => {
  try {
    const newArtwork = new Artwork(req.body);
    if (req.file) {
      newArtwork.imgUrl = req.file.path;
    }

    const newArtworkSaved = (await newArtwork.save()).populate("gallery");
    console.log(`"Artwork ${newArtworkSaved} saved ⚡️"`);

    return res.status(201).json(newArtworkSaved);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const putArtwork = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newArtwork = new Artwork(req.body);
    newArtwork._id = id;
    if (req.file) {
      newArtwork.imgUrl = req.file.path;
    }

    const newArtworkUpdated = await Artwork.findByIdAndUpdate(id, newArtwork, {
      new: true,
      runValidators: true
    });
    console.log(`"Artwork ${newArtworkUpdated} updated ⚡️"`);

    return res.status(200).json(newArtworkUpdated);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const deleteArtwork = async (req, res, next) => {
  try {
    const { id } = req.params;

    const artworkDeleted = await Artwork.findByIdAndDelete(id);
    console.log(`"Artwork: ${artworkDeleted} deleted 🔥`);

    if (artworkDeleted.imgUrl) {
      deleteFile(artworkDeleted.imgUrl);
    }

    return res.status(200).json(artworkDeleted);
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {
  getArtworks,
  getArtworkById,
  postArtwork,
  putArtwork,
  deleteArtwork
};
