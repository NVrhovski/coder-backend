import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

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

productSchema.plugin(mongoosePaginate);

mongoose.set('strictQuery', false);

const productModel = mongoose.model(productCollection, productSchema);

export default productModel