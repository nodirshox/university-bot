require('dotenv').config();
const mongoose = require("mongoose");

// set timezone
process.env.TZ = "Asia/Tashkent";

// Connection with Database
const mongoDBUrl = "mongodb://localhost:27017/bot";

console.log("Connecting to db " + mongoDBUrl);

mongoose.connect(mongoDBUrl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err, client) => {
        if (err) {
            console.log("There is an error in connecting db (" + mongoDBUrl + "): " + err.message);
            process.exit(1);
        }
    }
);

mongoose.connection.once("open", function () {
    console.log("Connected to the database");
});

// starting dashboard
let app = require("./dashboard");

const port = 3000;
app.listen(port, (err) => {
    console.log("Server has started on: http://localhost:", port);
});

let bot = require("./bot");
