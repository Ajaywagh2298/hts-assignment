const cors = require('cors');

const options = {
    methods: ['GET','POST','OPTIONS'],
    optionsSuccessStatus: 200,
    origin: 'localhost',
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
    credentials: true
};

module.exports = cors(options);
