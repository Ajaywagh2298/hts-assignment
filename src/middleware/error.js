const   logger  = require("../utils/log/logger.js");
const httpStatus = require("http-status");

const sendError = (err, req, res, next) => {
    logger.info(err);
    const response = {
        code: err.code,
        message: err.message,
        name: err.name,
        timestamp: new Date().toISOString(),
    };

    if(!response.code) {
        response.code = 500;
    }
    res.status(response.code);
    res.json(response);
    res.end();
};

module.exports = {sendError}
