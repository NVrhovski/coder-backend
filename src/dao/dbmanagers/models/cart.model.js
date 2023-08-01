import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const cartCollection = 'carts';
  
const cartSchema = new mongoose.Schema({
    products: {
      type: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
          },
          quantity: Number
        }
      ]
    }
})

mongoose.set('strictQuery', false);

const cartModel = mongoose.model(cartCollection, cartSchema);

export default cartModel