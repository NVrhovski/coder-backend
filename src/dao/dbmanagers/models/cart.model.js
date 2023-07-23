import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const cartCollection = 'carts';

const subSchema = new mongoose.Schema({
    product: String,
    quantity: Number
  });
  
const cartSchema = new mongoose.Schema({
    products: [subSchema]
})

mongoose.set('strictQuery', false);

const cartModel = mongoose.model(cartCollection, cartSchema);

export default cartModel