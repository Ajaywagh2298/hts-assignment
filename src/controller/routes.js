const express = require("express");
const { registerController, loginController } = require("./user/user.controller.js");

const router = express.Router();
router.post("/sign-up", registerController);
router.post("/sign-in", loginController);


module.exports = router;
