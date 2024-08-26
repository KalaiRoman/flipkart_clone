import mongoose from "mongoose";
const zoom_Meeting_User=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"zoom_auth"
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    status:{
        type:Boolean,
        default:true
    }
},
{
    timestamps:true
})
mongoose.models={};
export default mongoose.model("zoom_users",zoom_Meeting_User);