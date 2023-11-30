const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Review = require('../models/Review');
const Category = require('../models/Category');

router.get('/', async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();
        const totalReviews = await Review.countDocuments();
        const totalCategories = await Category.countDocuments();
        const products = await Product.find(); // Fetch all products or a subset as required

        res.render('index', { 
            products,         // Add this line to pass products array to the view
            totalProducts, 
            totalReviews, 
            totalCategories,
            user: req.user || false
        });
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).send("Error retrieving data");
    }
});

module.exports = router;
