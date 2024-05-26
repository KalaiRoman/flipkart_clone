import mongoose from 'mongoose';



const portfolio_mail_shema = new mongoose.Schema({
    username: String,
    email: {
        type: String, required: true,
        unique: true
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
    message:{
        type:String,
        required:true
    }
    
    
},
    {
        timestamps: true
    });
mongoose.models = {};
export default mongoose.model("portfoliomail", portfolio_mail_shema);