const express = require("express");
const delay = require("../middleware/delay");
const { Category } = require("../models/categories");
const router = express.Router();

router.get("/", delay, async (req, res) => {
  console.log("Accessing Database...");
  const categories = await Category.find().sort("name");
  res.send(categories);
});

module.exports = router;
