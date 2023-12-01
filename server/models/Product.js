const mongoose = require("mongoose");

// Product Schema
const productSchema = new mongoose.Schema({
  product_id: String,
  product_name: String,
  price: String,
  rating: String,
  description: String,
  categories: String,
  reviews: String
 
});

// Product Model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;