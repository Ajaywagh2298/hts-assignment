const bcrypt = require("bcryptjs");
const User = require("../../models/user.js");
const { logger } = require("../../utils/log/logger.js");
const {
    internalError,
    invalidUsernameOrPassword,
    unauthorized,
    userNotRegistered,
} = require("../../utils/error/error.js");
const login =({ email, password }) => {
    return new Promise(async (resolve, reject) => {
        const user = await User.findOne({ email : email.toLowerCase() });
        if (!user) {
            logger.debug(`${user} not registered`);
            let unauthorizedResponse = unauthorized;
            unauthorizedResponse.message = userNotRegistered;
            reject(unauthorizedResponse);
            return;
        }

        if (bcrypt.compareSync(password, user.password)) {
          //logger.debug(`${user} login successful`);
            user.deviceId = 3422333;
            user.hostnames = ["localhost"];
            resolve({ ...user.toJSON() });
        } else {
            let unauthorizedResponse = unauthorized;
            unauthorizedResponse.message = invalidUsernameOrPassword;
            reject(unauthorizedResponse);
        }
    });
}

const register = (params) => {
    return new Promise(async (resolve, reject) => {
        const user = new User(params);
        try {
            resolve(await user.save());
        } catch (e) {
            let internalErrorResponse = internalError;
            internalErrorResponse.message = "user registration failed";
            reject(internalErrorResponse);
        }
    });
}

module.exports = { login, register }
