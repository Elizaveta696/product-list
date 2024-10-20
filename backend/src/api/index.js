const express = require("express");
const products = require("./products");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        message: "Hello API"
    });
});

router.use("/products", products);

module.exports = router;