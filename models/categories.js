const mongoose = require("mongoose");
const Joi = require("joi");

const categorieSchema = new mongoose.Schema([
  {
    name: { type: String, required: true, minlength: 3, maxlength: 50 },
    icon: { type: String, required: false, minlength: 3, maxlength: 50 },
    backgroundColor: {
      type: String,
      required: false,
      maxlength: 7,
      minlength: 7,
    },
  },
]);

const Category = mongoose.model("Category", categorieSchema);

const validateCategory = (category) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    icon: Joi.string().min(3).max(50),
    backgroundColor: Joi.string().min(7).max(7),
  });
};

exports.Category = Category;
exports.validateCategory = validateCategory;
exports.categorieSchema = categorieSchema;
