const express = require("express");
const router = express.Router();
const products = require("../../../data.json");

router.get("/", async(req, res) => {
    res.json(products);
});

router.get("/:id", (req, res) => {
    let result = products.find(item => item["id"] === req.params.id);
    console.log(products[0]["id"])
    console.log(result);
    res.json(result);s
});

module.exports = router;