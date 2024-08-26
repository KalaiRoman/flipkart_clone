// create users mail
import Zoom_auth from "../../Models/auth/Zoom_auth.js";
import Zoom_meeting_mail_shema from "../../Models/zoom_meeting_create/Zoom_meeting_mail_shema.js";
export const Create_mail=async(req,res)=>{
    try {
        const {email}=req.body;
        const existUser=await Zoom_meeting_mail_shema.findOne({email});
        const existUser1=await Zoom_auth.findOne({email});
        if(existUser || existUser1)
        {
            return res.status(404).json({message:"User Already Exists",status:false});
        }
        const response=await Zoom_meeting_mail_shema.create({
            email,
            user:req.userid,
            status:true
        });
        await response.save();
        return res.status(201).json({message:"Create User Successfully",status:true,data:response});
    } catch (error) {
        return res.status(404).json({message:"Something Went Wrong",status:false});  
    }
}

// find Aluser Mails

export const find_all_mail=async(req,res)=>{
    try {
        const response=await Zoom_meeting_mail_shema.find({user:req.userid}).populate("user");
        return res.status(200).json({message:"Create User Successfully",status:true,data:response});
    } catch (error) {
        return res.status(404).json({message:"Something Went Wrong",status:false});  
    }
}

// find single uer Mails

export const find_single_mail=async(req,res)=>{
    try {
        const response=await Zoom_meeting_mail_shema.findById({_id:req.params.id});
        return res.status(200).json({message:"Create User Successfully",status:true,data:response});
    } catch (error) {
        return res.status(404).json({message:"Something Went Wrong",status:false});  
    }
}

// edit mail

export const find_edit_mail=async(req,res)=>{
    try {
        const response=await Zoom_meeting_mail_shema.findByIdAndUpdate({_id:req.params.id},req.body,{new:true});
        return res.status(200).json({message:"Updated User Successfully",status:true,data:response});
    } catch (error) {
        return res.status(404).json({message:"Something Went Wrong",status:false});  
    }
}

// delete mail
export const find_delete_mail=async(req,res)=>{
    try {
        const response=await Zoom_meeting_mail_shema.findByIdAndDelete({_id:req.params.id});
        return res.status(200).json({message:"Delete User Successfully",status:true,data:response});
    } catch (error) {
        return res.status(404).json({message:"Something Went Wrong",status:false});  
    }
}