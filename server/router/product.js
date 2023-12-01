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
router.post('/addProduct', async (req, res) => {
    try {
        const newProduct = new Product({
           
            product_id: req.body.product_id,
            product_name: req.body.product_name,
            price: req.body.price,
            rating: req.body.rating,
            description: req.body.description,
            categories: req.body.categories,
            reviews: req.body.reviews
           
        });

        await newProduct.save();
        res.redirect('/product/addProduct'); // Redirect to products list or confirmation page
    } catch (error) {
        console.error(error);
        res.status(500).send("Error adding product.");
    }
});

// Display the edit page
router.get('/edit/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.render('product/editProduct', { product: product }); 
  } catch (error) {
    res.status(500).send('Error retrieving product');
  }
});
// Handle the edit submission
router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const productUpdates = req.body;
  
      // Assuming your Product model schema has fields that match the keys in productUpdates
      const product = await Product.findByIdAndUpdate(id, productUpdates, { new: true });
  
      if (!product) {
        return res.status(404).send('Product not found');
      }
  
      // Redirect to the updated product's page, or wherever is appropriate
      res.redirect('/products/' + id);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error occurred while updating the product');
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
