const {forbidden} = require("../utils/error/error.js");
const {logger} = require("../utils/log/logger.js");
const {generateAccessToken} = require("../utils/jwt.js");

const isUser = async (req, res, next) => {
    try {
        if (req.user.email !== null ) {
            next();
        } else {
            let forbiddenResponse = forbidden;
            forbiddenResponse.message = "request only allowed for Exist USER";
            throw forbiddenResponse;
        }
    } catch (e) {
        logger.error(e);
        next(e, req, res);
    }
}


const setAuthCookie = async (req, res, token) => {
    if(!token) {
        const user = req.user;
        token = await generateAccessToken(user.email, user.lastname, user.password);
    }

    res.cookie("auth_token", token, {
        secure: true,
        httpOnly: true,
        maxAge: 30 * 60,
    });
}

module.exports = {
    isUser,
    setAuthCookie
}
