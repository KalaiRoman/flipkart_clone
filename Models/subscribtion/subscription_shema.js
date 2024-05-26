import mongoose from "mongoose";


const subscription_planshema = new mongoose.Schema({
    planName: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    productList: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    })

mongoose.models = {};

export default mongoose.model("subscription", subscription_planshema)