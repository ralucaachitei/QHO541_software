const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Adjust the path as per your project structure

// GET all products with pagination
router.get('/', async (req, res) => {
    let { page, limit } = req.query; // Assuming you're passing these as query parameters

    page = page ? parseInt(page, 10) : 1;
    limit = limit ? parseInt(limit, 10) : 10; // Default limit to 10 items per page

    try {
        const totalProducts = await Product.countDocuments(); // Get the total number of products
        const products = await Product.find()
            .skip((page - 1) * limit) // Skip for pagination
            .limit(limit); // Limit per page

        const numberOfPages = Math.ceil(totalProducts / limit);

        res.render('product/productsList', {
            products: products,
            currentPage: page,
            numberOfPages: numberOfPages
        });
    } catch (err) {
        console.error("Error: ", err.message);
        res.status(500).send(err.message);
    }
});
// GET a single product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.render('product/productDetails', { product: product });
    } catch (err) {
        res.status(500).send('Error retrieving product');
    }
});

// add a new product
router.get('/add', (req, res) => {
    res.render('product/addProduct');
});
// PUT to update a product
router.put('/:id', getProduct, async (req, res) => {
    if (req.body.name != null) {
        res.product.name = req.body.name;
    }
    if (req.body.price != null) {
        res.product.price = req.body.price;
    }
    // Update other fields as needed

    try {
        const updatedProduct = await res.product.save();
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a product
router.delete('/:id', getProduct, async (req, res) => {
    try {
        await res.product.remove();
        res.json({ message: 'Deleted Product' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware to get a product object by ID
async function getProduct(req, res, next) {
    let product;
    try {
        product = await Product.findById(req.params.id);
        if (product == null) {
            return res.status(404).json({ message: 'Cannot find product' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.product = product;
    next();
}

module.exports = router;
