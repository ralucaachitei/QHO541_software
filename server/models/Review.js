const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ReviewSchema = new Schema({
    product_id: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    user_name: {
        type: String,
        required: true
    },
    review_title: {
        type: String,
        required: true
    },
    review_content: {
        type: String,
        required: true
    },
   
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updateAt: {
        type: Date,
        default: Date.now()

    },

});

module.exports = mongoose.model('Review', ReviewSchema)