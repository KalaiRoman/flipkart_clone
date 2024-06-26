import mongoose from 'mongoose';


const chat_shema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    
},
{
    timestamps:true
})
const seller_shema = new mongoose.Schema({
    username: String,
    email: {
        type: String, required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg'
    },
    type: {
        type: String,
        default: "seller"
    },
    roleId: {
        type: Number,
        required: true,
        default: 2
    },
    sellerStatus: {
        type: Boolean,
        required: true,
        default: true
    },
    cloud_id: {
        type: String
    },
    chat: [chat_shema],
    availableProducts: {
        type: String,
        default: 0
    },
    planName: String
},
    {
        timestamps: true
    });
mongoose.models = {};
export default mongoose.model("sellerauth", seller_shema);