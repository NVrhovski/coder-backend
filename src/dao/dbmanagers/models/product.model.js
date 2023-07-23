import mongoose from "mongoose";

const productCollection = 'products';

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    code: {
        type: String,
        unique: true
    },
    price: Number,
    status: Boolean,
    stock: Number,
    category: String,
    thumbnails: [{
        type: String
    }]
})

mongoose.set('strictQuery', false);

const productModel = mongoose.model(productCollection, productSchema);

export default productModel