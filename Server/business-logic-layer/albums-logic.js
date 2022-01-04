const dal = require("../data-access-layer/dal");
const Album = require("../models/album");
const Category = require("../models/category");

dal
  .connectAsync()
  .then((db) => console.log("We're connected to musicAlbums on MongoDB."))
  .catch((err) => console.log(err));

function addAlbumAsync(album) {
  return album.save();
}

function getAllAlbumsAsync() {
  return new Promise((resolve, reject) => {
    Album.find({}, (err, albums) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(albums);
    });
  });
}

function getOneAlbumAsync(_id) {
  return new Promise((resolve, reject) => {
    Album.findOne({ _id }, (err, album) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(album);
    });
  });
}

function updateAlbumAsync(album) {
  return new Promise((resolve, reject) => {
    Album.updateOne({ _id: album._id }, album, (err, info) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(info.n ? album : null); // info.n - מספר המוצרים שנמצאו
    });
  });
}

function deleteAlbumAsync(_id) {
  return new Promise((resolve, reject) => {
    Album.deleteOne({ _id }, (err, info) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

// Comparison Query Operators:
// $gt  - Greater Than...
// $gte - Greater Than or Equal
// $lt  - Less Than
// $lte - Less Than or Equal
// $eq  - Equal
// $ne  - Not Equal
// $in  - In
// $nin - Not In

function getAlbumsByPriceRangeAsync(minPrice, maxPrice) {
  return new Promise((resolve, reject) => {
    Album.find({ price: { $gte: minPrice, $lte: maxPrice } }, (err, albums) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(albums);
    });
  });
}

function getAlbumsWithCategoryAsync() {
  return Album.find({}).populate("category").exec();
}

function getAlbumsFromCategoryAsync(id) {
  return Album.find({ categoryId: id }).populate("category").exec();
}
function getCategoriesWithAlbumsAsync() {
  return Category.find({}).populate("albums").exec();
}

module.exports = {
  addAlbumAsync,
  getAllAlbumsAsync,
  getOneAlbumAsync,
  updateAlbumAsync,
  deleteAlbumAsync,
  getAlbumsByPriceRangeAsync,
  getAlbumsFromCategoryAsync,
  getAlbumsWithCategoryAsync,
  getCategoriesWithAlbumsAsync,
};
