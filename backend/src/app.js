const express = require("express");
const api = require("./api");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json({
        message: "Hi!!",
    });
});
app.use("/api", api);

module.exports = app;