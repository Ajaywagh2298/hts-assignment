require("dotenv").config();

const SERVER_PORT = process.env.SERVER_PORT;
const MONGODB_CONNECTION_URL = process.env.MONGODB_CONNECTION_URL;
 const TOKEN_KEY = process.env.TOKEN_KEY;

 module.exports = {
        SERVER_PORT,
        MONGODB_CONNECTION_URL,
        TOKEN_KEY,
 }
