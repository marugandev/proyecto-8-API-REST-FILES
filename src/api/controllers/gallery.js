const Gallery = require("../models/gallery");
const { deleteFile } = require("../../utils/functions/deleteFile");

const getGalleries = async (req, res, next) => {
  try {
    const galleries = await Gallery.find().populate("artworks");

    return res.status(200).json(galleries);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getGalleryById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const gallery = await Gallery.findById(id).populate("artworks");

    return res.status(200).json(gallery);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const postGallery = async (req, res, next) => {
  try {
    const newGallery = new Gallery(req.body);
    /*     console.log(req.file); */
    if (req.file) {
      newGallery.imgUrl = req.file.path;
    }

    const newGallerySaved = (await newGallery.save()).populate("artworks");
    console.log(`"Gallery ${newGallerySaved} created ⚡️"`);

    return res.status(201).json(newGallerySaved);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const putGallery = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newGallery = new Gallery(req.body);
    newGallery._id = id;

    if (req.file) {
      newGallery.imgUrl = req.file.path;

      const oldGallery = await Gallery.findById(id);
      deleteFile(oldGallery.imgUrl);
    }

    const newGalleryUpdated = await Gallery.findByIdAndUpdate(id, newGallery, {
      new: true,
      runValidators: true
    });
    console.log(`"Gallery ${newGalleryUpdated} updated ⚡️"`);

    return res.status(200).json(newGalleryUpdated);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const deleteGallery = async (req, res, next) => {
  try {
    const { id } = req.params;

    const galleryDeleted = await Gallery.findByIdAndDelete(id);
    console.log(`"Gallery: ${galleryDeleted} deleted 🔥`);

    if (galleryDeleted.imgUrl) {
      deleteFile(galleryDeleted.imgUrl);
    }

    return res.status(200).json(galleryDeleted);
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {
  getGalleries,
  getGalleryById,
  postGallery,
  putGallery,
  deleteGallery
};
