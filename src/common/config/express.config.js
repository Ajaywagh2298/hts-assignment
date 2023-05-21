const express = require("express");
const cors = require("./cors.config.js");
const { sendError } = require("../../middleware/error.js");
const router = require("../../controller/routes.js");
const cookieParser = require("cookie-parser");

// Create an instance of the Express application
const app = express();

// Mount the middleware functions
app.use("*", cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Mount the router
app.use("/api", router);

// Mount the error handling middleware
app.use(sendError);

// Export the app
module.exports = app;
