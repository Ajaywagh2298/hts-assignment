const express = require("express");
const bcrypt = require("bcryptjs");
const { login, register } = require("../../middleware/service/user.service.js");
const User = require("../../models/user.js");
const logger  = require("../../utils/log/logger.js");
const { generateAccessToken } = require("../../utils/jwt.js");
const { badRequest, conflict } = require("../../utils/error/error.js");
const {setAuthCookie} = require("../../middleware/authorization.js");

const router = express.Router();
module.exports = router;

const registerController = async(req, res, next) =>{
    try {
       // const {  firstname, lastname, email, password } = req.body;
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const email = req.body.email;
        const password = req.body.password;
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", req.body)
        if (!firstname) {
            let badRequestResponse = badRequest;
            badRequestResponse.message = "missing firstname";
            throw badRequestResponse;
        }
        if (!lastname) {
            let badRequestResponse = badRequest;
            badRequestResponse.message = "missing lastname";
            throw badRequestResponse;
        }
        if (!email) {
            let badRequestResponse = badRequest;
            badRequestResponse.message = "missing email";
            throw badRequestResponse;
        }
        if (!password) {
            let badRequestResponse = badRequest;
            badRequestResponse.message = "missing password";
            throw badRequestResponse;
        }

        const PastUser  = await User.find( { email: email.toLowerCase() });


        if (PastUser.length > 0) {
            let conflictResponse = conflict;
            conflictResponse.message = "user already registered, please login.";
            throw conflictResponse;
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await register({
            firstname,
            lastname,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });

        res.status(200).json(user);
    } catch (err) {
        logger.error(err);
        next(err, req, res);
    }
}

const loginController = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        if (!(email && password)) {
            let badRequestResponse = badRequest;
            badRequestResponse.message = "missing email or password";
            throw badRequestResponse;
        }


        const user = await login({ email, password });

        const token = await generateAccessToken(user.email , user.firstname);
        await setAuthCookie(req, res, token );
        logger.info(`login successful for user: ${email}`, email)
        res.status(200).json(user);
    } catch (err) {
        logger.error(err);
        next(err, req, res);
    }
}

module.exports = {
    registerController,
    loginController
}
