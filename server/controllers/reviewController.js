const Product = require('../models/Review');
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
 * New Review Form
 */
exports.addReview = async (req, res) => {
  const locals = {
    title: 'Add New Review',
    description: " Adding new Review"
  }

  res.render('review/addReview', locals);

}


/**
 * POST
 * Create New Review
 */
exports.postReview = async (req, res) => {
  try {
    const newReview = new Review({
      product_id: req.body.product_id,
      rating: req.body.rating,
      user_name: req.body.user_name,
      review_title: req.body.review_title,
      review_content: req.body.review_content
      // ... other fields as per your schema
    });

    await newReview.save();
    // handle successful insertion, e.g., res.redirect or res.json
  } catch (error) {
    console.error('Error inserting review:', error);
    // handle error, e.g., res.status(500).send('Error')
  }
};



