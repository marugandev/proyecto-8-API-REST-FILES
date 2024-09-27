const mongoose = require("mongoose");

const artworkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    artist: {
      type: String,
      trim: true
    },
    year: {
      type: Number
    },
    imgUrl: {
      type: String,
      trim: true
    },
    gallery: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "galleries"
      }
    ]
  },
  {
    timestamps: true,
    collection: "artworks"
  }
);

const Artwork = mongoose.model("artworks", artworkSchema, "artworks");

module.exports = Artwork;
