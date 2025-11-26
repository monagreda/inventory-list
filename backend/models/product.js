const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: { type: String, required: true, unique: true },
    sku: { type: String, required: true, unique: true },
    quantity: { type: Number, required: true, default: 0, min: 0 },
    price: { type: Number, required: true, min: 0 },
    category: String,
    description: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);