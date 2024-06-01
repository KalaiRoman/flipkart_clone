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
    userstatusSaw:{
        type:Boolean,
        required:true,
        default:false
    }
},
{
    timestamps:true
})
const portfolio_shema = new mongoose.Schema({
    username: String,
    email: {
        type: String, required: true,
        unique: true
    },
    avatar: {
        type: String,
        default: 'https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg'
    },
    type: {
        type: String,
        default: "portfoliouser"
    },
    roleId: {
        type: Number,
        required: true,
        default: 4
    },
    portfoliouserStatus: {
        type: Boolean,
        required: true,
        default: true
    },
    chat: [chat_shema],
    
},
    {
        timestamps: true
    });
mongoose.models = {};
export default mongoose.model("portfolioauth", portfolio_shema);