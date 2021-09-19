const express = require("express");
const router = express.Router();
const Joi = require("joi");
const multer = require("multer");

const { schema, Listing } = require("../models/Listing");
const validateWith = require("../middleware/validation");
const auth = require("../middleware/auth");
const imageResize = require("../middleware/imageResize");
const delay = require("../middleware/delay");
const listingMapper = require("../mappers/listings");
const config = require("config");
const { Category } = require("../models/Category");

const upload = multer({
  dest: "uploads/",
  limits: { fieldSize: 25 * 1024 * 1024 },
});

const validateCategoryId = async (req, res, next) => {
  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send({ error: "Invalid categoryId." });

  next();
};

///////// ALL ABOVE THIS LINE SHOULD BE REFACTORED TO ANOTHER FILE

router.get("/", async (req, res) => {
  const listings = await Listing.find();
  const resources = listings.map(listingMapper); //Mapper adds the image url to the listing
  res.send(resources);
});

router.post(
  "/",
  [
    // Order of these middleware matters.
    // "upload" should come before other "validate" because we have to handle
    // multi-part form data. Once the upload middleware from multer applied,
    // request.body will be populated and we can validate it. This means
    // if the request is invalid, we'll end up with one or more image files
    // stored in the uploads folder. We'll need to clean up this folder
    // using a separate process.
    // auth,
    upload.array("images", config.get("maxImageCount")),
    //validateWith(schema),
    validateCategoryId,
    imageResize,
  ],

  async (req, res) => {
    const listing = {
      title: req.body.title,
      price: parseFloat(req.body.price),
      categoryId: req.body.categoryId,
      description: req.body.description,
    };
    listing.images = req.images.map((fileName) => ({ fileName: fileName }));
    if (req.body.location) listing.location = JSON.parse(req.body.location);
    if (req.user) listing.userId = req.user.userId;

    Listing.create(listing);

    res.status(201).send(listing);
  }
);

module.exports = router;
