import moment from "moment";
import mongoose from "mongoose";

const ticketsCollection = 'tickets';

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true
    },
    purchase_datetime: {
        type: Date,
        default: moment().format()
    },
    amount: Number,
    purchaser: String
})

mongoose.set('strictQuery', false);

const ticketModel = mongoose.model(ticketsCollection, ticketSchema);

export default ticketModel