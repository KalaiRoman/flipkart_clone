import Zoom_meeting_shema from "../../Models/zoom_meeting_create/Zoom_meeting_shema.js";
import jwt  from 'jsonwebtoken';
// create meeting
import nodemailer from 'nodemailer';
import Zoom_auth from "../../Models/auth/Zoom_auth.js";
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "kalairoman70@gmail.com",
        pass: "rkaasoiricuaignl",
    }
});
export const Create_Meeting=async(req,res)=>{
    try {
     
        const {
            name,
            Users,
            Duration,
            status,
            MeetingDate,invitedUsers,selectAllStatus,
        }=req.body;
        const tokenGen=await jwt.sign({name:name},process.env.TOKEN);
        const response=await Zoom_meeting_shema.create({
            name,
            Duration,
            Users,
            status,
            user:req.userid,
            MeetingDate,
            MeetingId:tokenGen.slice(0,8),
            invitedUsers,
            selectAllStatus,
            joinedUsers:[],
            rejectedUsers:[]
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
        if(response)
        {
           return res.status(200).json({message:"success Data",status:true,data:response})
        }
    } catch (error) {   
        res.status(404).json({message:"Something Went Wrong",status:false});
        
    }
}

// get Single data 
export const Single_Meeting=async(req,res)=>{
    try {
        const response=await Zoom_meeting_shema.findById({_id:req.params.id});
        res.status(200).json({message:"Get Single Data",status:true,data:response})
    } catch (error) {   
        res.status(404).json({message:"Something Went Wrong",status:false});
        
    }
}

// edit data 
export const Edit_Meeting=async(req,res)=>{
    try {
        const response=await Zoom_meeting_shema.findByIdAndUpdate({_id:req.params.id},req.body,{new:true});
        res.status(200).json({message:"Data Updated",status:true,data:response})
    } catch (error) {   
        res.status(404).json({message:"Something Went Wrong",status:false});
        
    }
}

// edit status data 
export const Edit_status_Meeting=async(req,res)=>{
    try {
        const response=await Zoom_meeting_shema.findByIdAndUpdate({_id:req.params.id},{
            status:req.body.status
        },{new:true});
        res.status(200).json({message:"Data Updated",status:true,data:response})
    } catch (error) {   
        res.status(404).json({message:"Something Went Wrong",status:false});
        
    }
}


// send mail
export const SendMail_user = async (req, res) => {
    const id = req.params.id;
    try {
      const userfind = await Zoom_meeting_shema.findById({ _id: id });  
      if (!userfind) {
        return res.status(404).json({ message: "Meeting not found", status: false });
      }
      const emailPromises = userfind.invitedUsers.map(async (userEmail) => {
        const mailOptions = {
          from: "kalairoman70@gmail.com",
          to: userEmail, 
          subject: 'Welcome to Join Meeting',
          html: `
            <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
              <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Zoom Meeting</title>
              <!--[if mso]><style type="text/css">body, table, td, a { font-family: Arial, Helvetica, sans-serif !important; }</style><![endif]-->
            </head>
            <body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
              <table role="presentation"
                style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(239, 239, 239);">
                <tbody>
                  <tr>
                    <td align="center" style="padding: 1rem 2rem; vertical-align: top; width: 100%;">
                      <table role="presentation" style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;">
                        <tbody>
                          <tr>
                            <td>
                              <div style="padding: 20px; background-color: rgb(255, 255, 255); width: 470px;">
                                <div style="color: rgb(0, 0, 0); text-align: left;">
                                  <h1 style="margin: 1rem 0">Hi! ${userEmail?.split("@")[0]}</h1>
                                  <p style="padding-bottom: 16px">I hope this message finds you well.</p>
                                  <p style="padding-bottom: 16px">Please join the meeting via the following link:</p>
                                  <p style="text-align: center; padding-bottom: 16px; text-decoration: none !important;"><a href="https://zoom-meeting-bice.vercel.app/confirm-meeting?meetingId=${userfind?.MeetingId}" target="_blank"
                                    style="text-decoration: none; padding: 12px 24px; border-radius: 4px; color: #FFF; background: #2B52F5;display: inline-block;margin: 0.5rem 0;">
                                  Join Meeting
                                    </a></p>
                                  <p style="padding-bottom: 16px">If you have any questions or need further information, feel free to contact me.</p>
                                  <p style="padding-bottom: 8px">Regards,<br/><b>Zoom Meeting</b></p>
                                  <p><b>"I have Risen From The Ashes Of My Past To Create a Future For Myself"</b></p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </body>
            </html>
          `
        };
  
        return transporter.sendMail(mailOptions);
      });
  
      await Promise.all(emailPromises);
      res.status(200).json({ message: "Mails sent successfully", status: true });
    } catch (error) {
      console.error("Error sending mail:", error);
      res.status(500).json({ message: "Error sending mails", status: false });
    }
  };
  
export const Track_meeting_mail=async(req,res)=>{
    try {
        const {meetingId,type}=req.body;
        const findMeetingId=await Zoom_meeting_shema.findOne({MeetingId:meetingId});
        const checkAuthUser=await Zoom_auth.findById({_id:req.userid});

        if(type=="JoinMeeting")
        {


            if(checkAuthUser)
            {
                if(meetingId)
                    {

                        if(findMeetingId?.joinedUsers?.includes(req.userid))
                        {
                            findMeetingId.joinedUsers=findMeetingId.joinedUsers;
                        }
                        else{
                            findMeetingId.joinedUsers.push(req.userid);
                            await findMeetingId.save();
                        }
                       
                        return res.status(200).json({message:"Meeting Joined",status:true,data:`https://zoom-meeting-bice.vercel.app/join?roomID=${meetingId}`})
                        // return res.status(200).json({message:"Meeting Joined",status:true,data:`http://localhost:3000/join?roomID=${meetingId}`})

                    }
            }
            else{
return res.status(404).json({message:"User Not Found",status:false})
            }
           
        }
        else
        {
            if(checkAuthUser)
                {
            if(meetingId)
                {
                    findMeetingId.rejectedUsers= findMeetingId.rejectedUsers || [];
                    findMeetingId.rejectedUsers.push(userId);
                    await findMeetingId.save();
                } 
            }
            else{
return res.status(404).json({message:"User Not Found",status:false})

            }
        }
       
    } catch (error) {
    }
}