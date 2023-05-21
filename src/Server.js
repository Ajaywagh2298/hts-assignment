const app= require("./common/config/express.config.js");
const logger = require( "./utils/log/logger.js");
const {
    MONGODB_CONNECTION_URL,
    SERVER_PORT,
} = require( "./common/constants/env.config.js");
const mongoose = require( "mongoose");

mongoose.connect(MONGODB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("error", function () {
    logger.error("Could not connect to the database. Exiting now...");
    process.exit();
});
mongoose.connection.once("open", function () {
    logger.info("Successfully connected to the database");
});

app.listen(SERVER_PORT, (err) => {
    if (err) {
        return logger.error("server failed to start", err);
    }
    return logger.info(`server started on port = [${SERVER_PORT}]`);
});
