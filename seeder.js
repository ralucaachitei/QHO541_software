const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// Import Mongoose models
const ProductModel = require("./server/models/Product");
const CategoryModel = require("./server/models/Category");
const ReviewModel = require("./server/models/Review");

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            dbName: DB_NAME
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

async function seedDB() {
  try {
    await connectDB();

    const filePath = path.join(__dirname, "amazon.json");
    const products = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    const categorySet = new Set();
    const reviews = [];

    // Process products
    for (const product of products) {
      product.category.split('|').forEach(cat => categorySet.add(cat.trim()));

      // Splitting user names, titles, and contents
      const userNames = product.user_name.split(',');
      const reviewTitles = product.review_title.split(',');
      const reviewContents = product.review_content.split(',');

      if (userNames.length !== reviewTitles.length || userNames.length !== reviewContents.length) {
        console.error(`Data mismatch in product ${product.product_id}: userNames, reviewTitles, and reviewContents lengths differ`);
        continue; // Skip this product
      }
      for (let i = 0; i < userNames.length; i++) {
        if (!reviewContents[i]) {
          console.error(`Missing review content for user ${userNames[i]} in product ${product.product_id}`);
          continue; // Skip this review
        }
        reviews.push({
          user_name: userNames[i],
          title: reviewTitles[i],
          review_content: reviewContents[i],
          product_id: product.product_id,
          rating: product.rating  // Use product's overall rating
        });
      }
    }

    // Insert unique categories
    await CategoryModel.insertMany([...categorySet].map(cat => ({ name: cat })));

    // Insert reviews
    await ReviewModel.insertMany(reviews);

    // Insert products
    for (const product of products) {
      const newProduct = new ProductModel({
        product_id: product.product_id,
        product_name: product.product_name,
        price: product.price,
        rating: product.rating,
        description: product.description
        // Link categories and reviews by references if needed
      });

      await newProduct.save();
    }

    console.log("Database seeding completed");
    process.exit();

  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDB();
