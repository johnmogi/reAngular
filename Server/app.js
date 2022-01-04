const express = require("express");
const cors = require("cors");
const albumsController = require("./controllers/albums-controller");
const catsController = require("./controllers/category-controller");
const server = express();

server.use(cors());
server.use(express.json());
server.use("/api/albums", albumsController);
server.use("/api/cats", catsController);

server.listen(4000, () => console.log("Listening on http://localhost:4000"));
