const Product = require('../models/Product'); 
const Review = require('../models/Review');   
const Category = require('../models/Category'); 

exports.getIndexData = async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();
        const totalReviews = await Review.countDocuments();
        const totalCategories = await Category.countDocuments();

        res.render('index', { 
            totalProducts, 
            totalReviews, 
            totalCategories 
        });
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).send("Error retrieving data");
    }
};

exports.displayProducts = async (req, res) => {
    try {
        const products = await Product.find().lean();
        for (const product of products) {
            const reviewCount = await Review.countDocuments({ product_id: product._id });
            product.reviewCount = reviewCount;
        }

        res.render('your-view-name', { products });
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).send("Error retrieving data");
    }
};