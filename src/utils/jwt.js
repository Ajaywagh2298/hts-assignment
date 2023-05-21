const jwt = require("jsonwebtoken");
const { TOKEN_KEY } = require("../common/constants/env.config.js");
const { logger } = require("./log/logger.js");
const { invalidUsernameOrPassword, unauthorized } = require("./error/error.js");
const authenticateToken = async (req, res, next) => {
    try {
        const token = req.cookies["auth_token"];
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", req);
        if (token == null) {
            let unauthorizedResponse = unauthorized;
            unauthorizedResponse.message = "Authorization token not present";
            throw unauthorizedResponse;
        }

        await jwt.verify(token, TOKEN_KEY, (err, decoded) => {
            if (err) {
                let unauthorizedResponse = unauthorized;
                unauthorizedResponse.message = "invalid authorization token";
                throw unauthorizedResponse;
            }
            if (!decoded) {
                let unauthorizedResponse = unauthorized;
                unauthorizedResponse.message = invalidUsernameOrPassword;
                throw unauthorizedResponse;
            }
            req.user = decoded;
            next();
        });
    } catch (e) {
        logger.error(e);
        next(e, req, res);
    }
}

const generateAccessToken = async (email, password) => {
    return await jwt.sign({ email : email, password : password }, TOKEN_KEY, {
        expiresIn: "30m",
    });
}

module.exports = { authenticateToken, generateAccessToken }
