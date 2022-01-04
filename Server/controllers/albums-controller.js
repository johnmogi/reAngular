const express = require("express");
const albumsLogic = require("../business-logic-layer/albums-logic");
const Album = require("../models/album");
const router = express.Router();

// GET http://localhost:3000/api/albums
router.get("/", async (request, response) => {
  try {
    const albums = await albumsLogic.getAllAlbumsAsync();
    response.json(albums);
  } catch (err) {
    console.log(err);
    response.status(500).send(err.message);
  }
});

// GET http://localhost:3000/api/albums/7
router.get("/:_id", async (request, response) => {
  try {
    const _id = request.params._id;
    const album = await albumsLogic.getOneAlbumAsync(_id);

    if (!album) {
      response.sendStatus(404);
      return;
    }

    response.json(album);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

// POST http://localhost:3000/api/albums
router.post("/", async (request, response) => {
  const body = request.body;
  try {
    const album = new Album(body);
    const addedAlbum = await albumsLogic.addAlbumAsync(album);
    response.status(201).json(addedAlbum);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

// PUT http://localhost:3000/api/albums/7
router.put("/:_id", async (request, response) => {
  try {
    const _id = request.params._id;
    const album = new Album(request.body);
    album._id = _id;
    const updatedAlbum = await albumsLogic.updateAlbumAsync(album);

    if (updatedAlbum === null) {
      response.sendStatus(404);
      return;
    }

    response.json(updatedAlbum);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

// PATCH http://localhost:3000/api/albums/7
router.patch("/:_id", async (request, response) => {
  try {
    const _id = request.params._id;
    const album = new Album(request.body);
    album._id = _id;
    const updatedAlbum = await albumsLogic.updateAlbumAsync(album);

    if (updatedAlbum === null) {
      response.sendStatus(404);
      return;
    }

    response.json(updatedAlbum);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

// DELETE http://localhost:3000/api/albums/7
router.delete("/:_id", async (request, response) => {
  try {
    const _id = request.params._id;
    await albumsLogic.deleteAlbumAsync(_id);
    response.sendStatus(204);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

// --------------------------------------------------
// Queries:
router.get("/by-price-range/:minPrice/:maxPrice", async (request, response) => {
  try {
    const minPrice = +request.params.minPrice;
    const maxPrice = +request.params.maxPrice;
    const albums = await albumsLogic.getAlbumsByPriceRangeAsync(
      minPrice,
      maxPrice
    );
    response.json(albums);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

// http://localhost:3000/api/albums/cat/id
router.get("/cat/:_id", async (request, response) => {
  const id = request.params._id;
  try {
    const albums = await albumsLogic.getAlbumsFromCategoryAsync(id);
    response.json(albums);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

// http://localhost:3000/api/albums/join/albums-with-category
router.get("/join/albums-with-category", async (request, response) => {
  try {
    const albums = await albumsLogic.getAlbumsWithCategoryAsync();
    response.json(albums);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.get("/join/categories-with-albums", async (request, response) => {
  try {
    const categories = await albumsLogic.getCategoriesWithAlbumsAsync();
    response.json(categories);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

module.exports = router;
