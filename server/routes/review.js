const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

/**
 * Review
 *  Routes
 */

router.get('/', reviewController.homepage);

router.get('/addReview', reviewController.addReview);
router.post('/addReview', reviewController.postReview);

module.exports = router;