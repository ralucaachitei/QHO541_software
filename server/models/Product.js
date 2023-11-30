const mongoose = require("mongoose");

// Product Schema
const productSchema = new mongoose.Schema({
  product_id: String,
  product_name: String,
  price: String,
  rating: String,
  description: String,
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
});

// Product Model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;