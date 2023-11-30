const express = require('express');
const router = express.Router();
const Review = require('../models/Review'); // Adjust the path as per your project structure

// GET all reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find().populate('product_id');
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Edit a review
router.get('/:id/edit', async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            // Handle the case where the review is not found
            return res.status(404).send('Review not found');
        }
        res.render('editReview', { review: review });
    } catch (err) {
        res.status(500).send('Error retrieving review');
    }
});
// GET a single review by ID
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find().populate('product_id');
        res.render('reviewsList', { reviews: reviews }); // Pass the reviews to the EJS template
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new review
router.post('/', async (req, res) => {
    const review = new Review({
        product_id: req.body.product_id,
        user_name: req.body.user_name,
        rating: req.body.rating,
        review_content: req.body.review_content
       
    });

    try {
        const newReview = await review.save();
        res.status(201).json(newReview);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT to update a review
router.put('/:id', getReview, async (req, res) => {
    if (req.body.user_name != null) {
        res.review.user_name = req.body.user_name;
    }
    if (req.body.rating != null) {
        res.review.rating = req.body.rating;
    }
    if (req.body.review_content != null) {
        res.review.review_content = req.body.review_content;
    }
    // Update other fields as needed

    try {
        const updatedReview = await res.review.save();
        res.json(updatedReview);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a review
router.delete('/:id', getReview, async (req, res) => {
    try {
        await res.review.remove();
        res.json({ message: 'Deleted Review' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware to get a review object by ID
async function getReview(req, res, next) {
    let review;
    try {
        review = await Review.findById(req.params.id);
        if (review == null) {
            return res.status(404).json({ message: 'Cannot find review' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.review = review;
    next();
}

module.exports = router;
