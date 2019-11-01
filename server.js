const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const projectRouter = require("./data/helpers/projectRouter");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/projects", projectRouter);

server.get("/", (req, res) => {
  res.send(`<h3>Middleware coming through!</h3>`);
});

module.exports = server;
