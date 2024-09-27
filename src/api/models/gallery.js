const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    imgUrl: {
      type: String,
      trim: true
    },
    artworks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "artworks"
      }
    ]
  },
  {
    timestamps: true,
    collection: "galleries"
  }
);

const Gallery = mongoose.model("galleries", gallerySchema, "galleries");

module.exports = Gallery;
