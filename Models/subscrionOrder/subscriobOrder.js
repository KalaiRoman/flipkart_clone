import mongoose from "mongoose";


const subscription_planshema_order = new mongoose.Schema({
    planName: {
        type: String,
    },
    amount: {
        type: String,
        required: true
    },
    order_id: {
        type: String,
        required: true
    },
    productList: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sellerauth"
    }
},
    {
        timestamps: true
    })

mongoose.models = {};

export default mongoose.model("subscriptionorder", subscription_planshema_order)