import mongoose from "mongoose";

const zoom_auth=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:5,
        max:9,
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"admin"
    }
},
{
    timestamps:true
})
mongoose.models={};
export default mongoose.model("zoom_auth",zoom_auth);