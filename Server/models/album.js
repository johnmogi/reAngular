const mongoose = require("mongoose");

const AlbumSchema = new mongoose.Schema(
  {
    albumName: String,
    albumImage: String,
    artist: String,
    date: String,
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { versionKey: false, toJSON: { virtuals: true }, id: false }
);

AlbumSchema.virtual("category", {
  // category = name of the virtual field.
  ref: "Category", // Model of the joined collection
  localField: "categoryId", // Name of the local field to join.
  foreignField: "_id", // Name of the remote field to join,
  justOne: true, // Create an object and not an array
});

const Album = mongoose.model("Album", AlbumSchema);

module.exports = Album;
