const path = require("path");
const express = require("express");
const body_parser = require("body-parser");
const request_security = require("./middlewares/request_security");
const password_security = require("./middlewares/password_security");
const mongo_db = require("./middlewares/mongo_db.js");
const users = require("./routes/users.js");

const app = express();

//middlewares
app.use(express.static(path.join(__dirname, "/public"),{index: "login.html"}));
app.use(body_parser.json());
app.use(request_security);
app.use(password_security);
app.use(mongo_db);

//routes
app.use(users);

app.listen(8080, () => {
    const time_now = new Date(Date.now());

    console.log(`[${time_now.getHours()}:${time_now.getMinutes()}] Server ON`);
});