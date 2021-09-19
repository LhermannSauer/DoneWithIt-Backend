const { model, Schema, Types } = require("mongoose");
const Joi = require("joi-oid");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
    trim: true,
  },
  categoryId: { type: Types.ObjectId, required: true, maxlength: 50 },
  description: {
    type: String,
    required: false,
    minlength: 0,
    maxlength: 500,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    max: 9999,
    min: 1,
  },
  userId: {
    type: Types.ObjectId,
    maxlength: 50,
    required: false,
    trim: true,
  },
  location: {
    latitude: {
      type: Number,
      required: false,
    },
    longitude: {
      type: Number,
      required: false,
    },
    required: false,
  },
  images: {
    type: [],
    required: true,
    maxlength: 255,
  },
});

const Listing = model("Listing", listingSchema);

const schema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  categoryId: Joi.objectId().required(),
  description: Joi.string().min(0).max(500).allow(""),
  price: Joi.number().min(1).required(),
  location: Joi.object({
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
  }).optional(),
  userId: Joi.objectId().optional(),
});

exports.Listing = Listing;
exports.listingSchema = listingSchema;
exports.schema = schema;
