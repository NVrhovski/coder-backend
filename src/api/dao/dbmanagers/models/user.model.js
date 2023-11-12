import mongoose from "mongoose";

const userCollection = 'users';

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    age: Number,
    password: String,
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts'
      },
    role: {
        type: String,
        default: 'User'
    },
    documents: {
        type: [
            {
              name: String,
              reference: String
            }
        ]
    },
    last_connection: Date
})

mongoose.set('strictQuery', false);

const userModel = mongoose.model(userCollection, userSchema);

export default userModel