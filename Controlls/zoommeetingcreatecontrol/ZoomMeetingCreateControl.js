import Zoom_meeting_shema from "../../Models/zoom_meeting_create/Zoom_meeting_shema.js";
// create meeting
export const Create_Meeting=async(req,res)=>{
    try {

        const randomMeeting="ABCDEFGHIJKLMNOOPQRSTUVWXYZMEETINGADATARANDOMUSERS";
        const random=Math.floor(Math.random()*randomMeeting?.length)
        const {
            name,
            Users,
            Duration,
            status,
            MeetingDate
        }=req.body;
        const response=await Zoom_meeting_shema.create({
            name,
            Duration,
            Users,
            status,
            user:req.userid,
            MeetingDate,
            MeetingId:randomMeeting.slice(random)

        })
        await response.save();
        res.status(201).json({message:"Created Meeting Successfully",status:true,data:response});
    } catch (error) {
        res.status(404).json({message:"Something Went Wrong",status:false});
    }
}

// get meeting in perticlular users

export const Get_Meetings=async(req,res)=>{
    try {

        const response=await Zoom_meeting_shema.find({user:req.userid}).populate("user");
        res.status(200).json({message:"success Data",status:true,data:response})
    } catch (error) {   
        res.status(404).json({message:"Something Went Wrong",status:false});
        
    }
}