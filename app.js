const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./src/routes");
require("./src/utils/loggerUtil");

const app = express();

// Middleware to handle Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Middleware for logging HTTP requests
app.use(morgan("dev"));

// app.use(bodyParser.json()); //for JSON request bodies

// Middleware to handle form submissions or URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Middleware to handle JSON request bodies
app.use(
  express.json({
    limit: "30mb",
  })
);

// Use the routes for the `/api` path
app.use("/api", routes);

// Serving static file from uploads
app.use(express.static("public"));

// app.use(errorMiddleware);

// Export the app instance to be used in the entry file (index.js)
module.exports = app;
