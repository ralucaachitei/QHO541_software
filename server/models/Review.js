
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    product_id: {
        type: String,
        required: true,
        ref: 'Product' // Assuming you have a Product model
    },
    user_name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    review_content: {
        type: String,
        required: true
    }
    // Add other fields as needed
});

module.exports = mongoose.model('Review', reviewSchema);
