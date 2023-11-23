const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    product_id: {
        type: String,
        required: true
    },
    product_name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    description: {
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

module.exports = mongoose.model('Product', ProductSchema)