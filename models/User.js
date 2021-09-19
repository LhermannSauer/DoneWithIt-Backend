const { model, Schema, Types } = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  isAdmin: Boolean,
  // avatar: {
  //   type: { filename: String },
  //   required: true,
  // },
  //createdAt: String, // learn how to add date, autocreated
});

const User = model("User", userSchema);

/**
 * A function to validate the user's input to register an account.
 * @param {Object} user A User object, must include username, email and password
 * @returns {Boolean} Boolean
 */
const schema = Joi.object({
  username: Joi.string().min(5).max(50).required(),
  email: Joi.string().email().min(5).max(255).required(),
  password: Joi.string().min(5).max(50).required(),
});

exports.User = User;
exports.schema = schema;
exports.userSchema = userSchema;
