import mongoose from 'mongoose';

const admin_shemachat = new mongoose.Schema({
    message: {
        type: String,
    },
    status: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})
const Product_Shema = new mongoose.Schema({
    productname: {
        type: String,
        required: true,
        trim: true
    },
    oldprice: {
        type: String,
        required: true
    },
    saleprice: {
        type: String,
        required: true
    },
    discount: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    thumbimage: {
        type: String,
        required: true
    },
    imagestore: {
        type: Array,
        required: true,
        default: []
    },
    color: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sellerauth'
    },
    userquantity: {
        type: String,
        default: "1"
    },
    productStatus: {
        type: Boolean,
        required: true,
        default: false
    },
    adminproductChat: [admin_shemachat]

}, {
    timestamps: true
})

mongoose.models = {};


export default mongoose.model("product", Product_Shema);