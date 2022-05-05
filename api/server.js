const express = require("express");

const server = express();

const usersRouter = require("./users/users-router");

const cors = require("cors");

const helmet = require("helmet");

server.use(cors());
server.use(helmet());

server.use(express.json());
server.use("/api/users", usersRouter);


server.get("/", (req, res) => {
    res.status(200).send("API running")
});

server.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message})
});

module.exports = server;
