const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

require("dotenv").config();
require("./models/user");

const { notFound, errorHandler } = require("./middlewares//errorMiddlewares");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Basic middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄Server running",
  });
});

// Routes
fs.readdirSync("./src/routes").map((r) =>
  app.use("/api/v1", require(`./routes/${r}`))
);

// middlewares
app.use(notFound);
app.use(errorHandler);

module.exports = app;
