require("dotenv").config();
const mongoose = require("mongoose");
const Gallery = require("../../api/models/gallery");
const galleries = require("../../data/galleries");
const Artwork = require("../../api/models/artWork");

const seed = async (model, modelName, data) => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to the BBDD ⚡️");

    await model.collection.drop();
    console.log(`"${modelName} deleted from the BBDD  🔥"`);

    const insertedData = await model.insertMany(data);
    console.log(`"${modelName} added to the BBDD ⚡️"`);

    await mongoose.disconnect();
    console.log("Disconnected from the BBDD 🔥");

    return insertedData;
  } catch (error) {
    console.log("The seed could not be implanted 😔", error);
  }
};

const runSeed = async () => {
  const insertedGalleries = await seed(Gallery, "Galleries", galleries);

  const modernGalleryId = insertedGalleries.find(
    (g) => g.name === "Galería de Arte Moderno"
  )._id;
  const classicGalleryId = insertedGalleries.find(
    (g) => g.name === "Galería de Arte Clásico"
  )._id;

  const artworks = [
    {
      title: "El Grito",
      artist: "Edvard Munch",
      year: 1893,
      imgUrl:
        "https://res.cloudinary.com/cloudcloudinary0/image/upload/v1727431453/e0kb9tt6cfpqq5siutuu.jpg",
      gallery: modernGalleryId
    },
    {
      title: "La noche estrellada",
      artist: "Vincent van Gogh",
      year: 1889,
      imgUrl:
        "https://res.cloudinary.com/cloudcloudinary0/image/upload/v1727431453/xjsg9cchhlyqkcvjfel8.jpg",
      gallery: classicGalleryId
    }
  ];

  const insertedArtworks = await seed(Artwork, "Artworks", artworks);

  await mongoose.connect(process.env.DB_URL);

  await Gallery.findByIdAndUpdate(modernGalleryId, {
    $push: {
      artworks: insertedArtworks.find((a) => a.title === "El Grito")._id
    }
  });
  await Gallery.findByIdAndUpdate(classicGalleryId, {
    $push: {
      artworks: insertedArtworks.find((a) => a.title === "La noche estrellada")
        ._id
    }
  });

  await mongoose.disconnect();

  console.log("Seed process completed ⚡️");
};

runSeed();
