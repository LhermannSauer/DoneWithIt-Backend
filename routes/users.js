const express = require("express");
const router = express.Router();
const multer = require("multer");
const bcrypt = require("bcrypt");
const _ = require("lodash");

const { schema, User } = require("../models/User");
const validateWith = require("../middleware/validation");
const imageResize = require("../middleware/imageResize");

const upload = multer({
  dest: "userAvatars/",
  limits: { fieldSize: 25 * 1024 * 1024, files: 1 },
});

// Registering a new user.
router.post("/", [validateWith(schema)], async (req, res) => {
  const { username, email, password } = req.body;
  let user = await User.findOne({ email: email });
  if (user)
    return res
      .status(400)
      .send({ error: "A user with the given email already exists." });

  user = new User({ username, email, password });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  res.send(_.pick(user, ["_id", "username", "email"]));
});

// TODO: Delete it
router.get("/", async (req, res) => {
  let users;
  try {
    users = await User.find().select("-password");
  } catch (e) {
    res.status(401).send(e.message);
  }
  res.send(users);
});

module.exports = router;
