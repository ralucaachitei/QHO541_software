const mongoose = require("mongoose");

// Category Schema
const categorySchema = new mongoose.Schema({
  name: String,
});

// Category Model
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;