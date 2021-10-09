require('dotenv').config();
const mongoose = require("mongoose");
const config = require('./config');

// set timezone
process.env.TZ = "Asia/Tashkent";

// Connection with Database
console.log("Connecting to db " + config.mongoURL);

mongoose.connect(config.mongoURL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err, client) => {
        if (err) {
            console.log("There is an error in connecting db (" + config.mongoURL + "): " + err.message);
            process.exit(1);
        }
    }
);

mongoose.connection.once("open", function () {
    console.log("Connected to the database");
});

// starting dashboard
let app = require("./dashboard");

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
    console.log(`Server has started on: http://localhost:${port}`);
});
