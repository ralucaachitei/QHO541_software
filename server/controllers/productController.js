const Product = require('../models/Product');
const mongoose = require('mongoose');

/**
 * GET
 * Hompepage
 */


exports.homepage = async (req, res) => {

    
    const locals = {
        title: "NodeJs",
        description: " Free NodeJs User Management System" 
     }
    
    res.render('index', locals);

}

/**
 * GET
 * New Product Form
 */
exports.addProduct = async (req, res) => {
const locals = {
    title: 'Add New Product',
        description: " Adding new Product" 
     }
    
    res.render('product/add', locals);

}


/**
 * POST
 * Create New Product 
 */
exports.postProduct = async (req, res) => {
   console.log(req.body);

   const newProduct = new Product({
    product_id: req.body.product_id,
    product_name: req.body.product_name,
    category: req.body.category,
    price: req.body.price,
    rating: req.body.rating,
    description: req.body.description
 })

  try {
     
    await Product.create(newProduct);
    res.redirect('/');

  } catch (error) {
    console.log(error);
  }
        
    
    }
