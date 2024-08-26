import mongoose from "mongoose";
const zoom_meeting_creae_shema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    Duration:{
        type:String,
        required:true
    },
    Users:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"zoom_auth"
    },
    MeetingDate:{
        type:String,
        required:true
    },
    MeetingId:{
        type:String,
        required:true
    },
    invitedUsers:{
        type:Array,
        default:[]
    },
    selectAllStatus:{
        type:Boolean,
        default:false
    },
    joinedUsers:{
        type:Array,
        default:[]
    },
    rejectedUsers:{
        type:Array,
        default:[]
    }
},
{
    timestamps:true
})

mongoose.models={};

export default mongoose.model("zoom_meeting",zoom_meeting_creae_shema)