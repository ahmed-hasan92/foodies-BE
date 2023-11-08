const express = require("express");
const { getAllCategories } = require("./category.controller");
const router = express.Router();

router.get("/categories", getAllCategories);

module.exports = router;
