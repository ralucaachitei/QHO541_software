const express = require('express');
const router = express.Router();
const Category = require('../models/Category'); 

// GET all categories
router.get('/', async (req, res) => {
    try {
      const categories = await Category.find();
      res.render('categories/categoryList', {
        categories 
      });
    } catch (err) {
      // error handling
    }
  });
  
  router.post('/', async (req, res) => {
    // Create category
    // Redirect
    res.redirect('/categories'); 
  });
// GET a single category 
router.get('/:id', getCategory, (req, res) => {
    res.render('category/categoryDetails', {
      category: res.category 
    });
  });
// POST a new category
router.get('/add', (req, res) => {
    res.render('categories/addCategory'); 
  });
  
  router.post('/', async (req, res) => {
    // Create category 
    res.redirect('/categories');
  });

// PUT to update a category
router.get('/:id/edit', getCategory , (req, res) => {
    res.render('categories/editCategory', {
      category: res.category  
    }); 
  });

    

// DELETE a category
router.get('/:id/delete', getCategory, (req, res) => {
    res.render('categories/deleteCategory', {
      category: res.category
    });
  }); 
  
  router.delete('/', getCategory, async (req, res) => {
    // Delete category
    res.redirect('/categories');
  });

// Middleware to get a category object by ID
async function getCategory(req, res, next) {
    let category;
    try {
        category = await Category.findById(req.params.id);
        if (category == null) {
            return res.status(404).json({ message: 'Cannot find category' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.category = category;
    next();
}

module.exports = router;
