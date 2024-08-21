
import jwt from "jsonwebtoken";
import Portfolio_usermodel from "../../../Models/auth/Portfolio_usermodel.js";
import otp_shema from "../../../Models/auth/otp_shema.js";
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import otpGenerator from 'otp-generator';
import Admin_models from "../../../Models/auth/Admin_models.js";
import cron from 'node-cron';
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "kalairoman70@gmail.com",
        pass: "rkaasoiricuaignl",
    }
});
export const CreateandLogin = async (req, res) => {
    const { email } = req.body;
    try {
        const existuserCheck = await Portfolio_usermodel.findOne({ email });
        if (existuserCheck) {
            await CallBackOtp(existuserCheck._id, existuserCheck.email);
            return res.status(200).json({ message: "success", userid: existuserCheck._id });
        } else {
            const splitEmail = email.split("@");
            const newUser = new Portfolio_usermodel({
                email,
                username: splitEmail[0],
                type: "portfoliouser",
                roleId: 4,
                portfoliouserStatus: true,
                chat: [],
                avatar: "https://img.freepik.com/premium-photo/small-boy-colorful-background-funny-cartoon-character-school-kid-3d-generative-ai_58409-28656.jpg"
            });
            const response = await newUser.save();
            await CallBackOtp(response._id, email);
            return res.status(201).json({ message: "success", userid: response._id });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
}

const CallBackOtp = async (_id, email) => {
    try {
        const otp = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
        const salt = await bcrypt.genSalt(10);
        const hashedOtp = await bcrypt.hash(otp, salt);
        
        await otp_shema.findOneAndUpdate(
            { email },
            { otp: hashedOtp, userId: _id, roleId: 4 },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        const mailOptions = {
            from: "kalairoman70@gmail.com",
            to: email,
            subject: 'Your OTP Here!',
            html: `
            <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify your login with OTP</title>
  <!--[if mso]><style type="text/css">body, table, td, a { font-family: Arial, Helvetica, sans-serif !important; }</style><![endif]-->
</head>

<body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
  <table role="presentation"
    style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(239, 239, 239);">
    <tbody>
      <tr>
        <td align="center" style="vertical-align: top; width: 100%;">
          <table role="presentation" style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;">
            <tbody>
              <tr>
                <td>
                  <div style="padding: 20px; background-color: rgb(255, 255, 255); width: 350px;">
                    <div style="color: rgb(0, 0, 0); text-align: left;">
                  
                      <h1 style="margin: 1rem 0">Verification code</h1>
                      <p style="padding-bottom: 16px">Please use the verification code below to sign in.</p>
                      <p style="padding-bottom: 16px"><strong style="font-size: 130%">${otp}</strong></p>
                      <p style="padding-bottom: 16px">If you didn't request this, you can ignore this email.</p>
                      <p style="padding-bottom: 8px">Regards,<br/><b>Kalaisurya.G</b></p>
                    </div>
                    <div style="text-align: center;">
                      
                    </div>
                    <div style="text-align: center;">
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
        await CallBackMail(email);
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}


const CallBackMail=async(mail)=>{
    const mailOptions = {
        from: "kalairoman70@gmail.com",
        to: mail,
        subject: 'New User Visited Your Website',
        html: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>$PageTitle$</title>
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
                      <h1 style="margin: 1rem 0">$Title$</h1>
                      <p style="padding-bottom: 16px">Dear ${mail},</p>
                      <p style="padding-bottom: 16px">$Message$</p>
                      <p style="padding-bottom: 16px">If this email is not relevant to you, please ignore this email.</p>
                      <p style="padding-bottom: 8px">Regards,<br/><b>Anu Kulkarni - Founder and Director</b></p>
                      <p><b>"I have Risen From The Ashes Of My Past To Create a Future For Myself"</b></p>
                    </div>
                    <div style="text-align: center;">
                      <img width="200" src="https://womeyn-prod-statics.s3.ap-southeast-2.amazonaws.com/img/womeyn_logo.png"
              alt="Womeyn Logo"/>
                    </div>
                    <div style="text-align: center;">
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
    return await transporter.sendMail(mailOptions);
}

export const OtpConfirm = async (req, res) => {
    const { otp, userid } = req.body;

    try {
        const response = await otp_shema.findOne({ userId: userid });
        if (!response) {
            return res.status(400).json({ message: "OTP not found!" });
        }
        const isValidOtp = await bcrypt.compare(otp, response.otp);
        if (isValidOtp) {
            const token = jwt.sign({ _id: userid }, process.env.TOKEN, { expiresIn: "10d" });
            return res.status(200).json({ message: "OTP Correct", token,userid:response?._id });
        } else {
            return res.status(400).json({ message: "Wrong OTP!" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
}


// get user current

export const getUser = async (req, res) => {
    try {
        const response = await Portfolio_usermodel.findById({ _id: req.userid });

        if (response) {
            return res.status(200).json({ message: "sucessfully", user: response })
        }
    } catch (error) {
        res.status(500).json({ message: error })

    }
}


export const ChatUserportfolio = async (req, res) => {
    const { userid, message, type } = req.body;
    try {
        const data = {
            message: message,
            type: type,
            userstatusSaw:false,
            likeUser:""
        }
        const response = await Portfolio_usermodel.findByIdAndUpdate({ _id: userid }, {
            $push: { chat: data }
        }, { new: true });
        res.status(200).json({ message: "succesfully chat user" })
    } catch (error) {
res.status(404).json({message:error});
    }
}

// delete message comment

export const ChatUserDeleteportfolio = async (req, res) => {
    const {messageId} = req.body;
    try {
      
await Portfolio_usermodel.findByIdAndUpdate({ _id: req.userid }, {
            $pull: { chat: {_id:messageId} }
        }, { new: true });
        res.status(200).json({ message: "Delete Message successfully",status:true })
    } catch (error) {
res.status(404).json({message:error});
    }
}

// chat message status
export const ChatUserStatusUpdateportfolio = async (req, res) => {
    try {
      
        const response = await Portfolio_usermodel.findById({ _id:userid });
        response.chat.forEach(chatItem => {
            if (chatItem.type === type) {
                chatItem.userstatusSaw = true;
            }
        });
        await response.save();
        return res.status(200).json({ message: "Updated Status Message" })
    } catch (error) {
return res.status(404).json({message:error});
    }
}

export const Adiminuser = async (req, res) => {
    try {
        const response = await Admin_models.find({});

        if (response) {
            return res.status(200).json({ message: "success", adminuser: response });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

// like User Chat Message

export const chatMessageLike = async (req, res) => {

    const {chatId,like}=req.body;
    try {
        const response = await Portfolio_usermodel.findById({ _id:req.userid });
        const LikeUser=await response?.chat?.find((item,index)=>item?._id==chatId);
        LikeUser.likeUser=like;
        await response.save();
        if (response) {
            return res.status(200).json({ message: "Like User Successfully", status:true,data: response });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

// upadte profile

export const updateProfileUser=async(req,res)=>{
    try {
        const response=await Portfolio_usermodel.findByIdAndUpdate({_id:req.userid},req.body,{new:true});
        if(response) return res.status(200).json({message:"Profile Updated",status:true});
    } catch (error) {
        res.status(405).json({message:error,status:false})
    }
}


// image upload check

export const ImageUploadCheck=async(req,res)=>{
    try {
        const response=await response
    } catch (error) {
        
    }
}


// // seconds update chat

// function TimerSectionChat(){
//   ChatUserportfolio();
// }

// cron.schedule('* * * * * *', () => {
//   setInterval(TimerSectionChat, 2000);
// });
