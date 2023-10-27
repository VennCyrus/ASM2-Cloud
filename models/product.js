var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        default: ''
    },
    price: {
        type: String,
        default: ''
    },
    quantity: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('product', productSchema, 'product');
