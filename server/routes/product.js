const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

/**
 * Products
 *  Routes
 */

router.get('/', productController.homepage);

router.get('/add', productController.addProduct);
router.post('/add', productController.postProduct);

module.exports = router;