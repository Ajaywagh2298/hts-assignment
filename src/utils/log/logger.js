const { format } = require("winston");
const winston = require("winston");


const logger = winston.createLogger({
    level: "info",
    format: format.combine(format.timestamp(), format.json()),
    transports: [
        new winston.transports.File({ filename: "logs/app.log" }),
        new winston.transports.Console(),
    ],
    colorize: true,
    timestamp: true,
});

module.exports = logger;
