
import jwt from "jsonwebtoken";
import Portfolio_usermodel from "../../../Models/auth/Portfolio_usermodel.js";
import otp_shema from "../../../Models/auth/otp_shema.js";
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import otpGenerator from 'otp-generator';
import Admin_models from "../../../Models/auth/Admin_models.js";
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
            html: `<div style="text-align:center;">
            <div style="width:100%;height:100%;">
            <div style="margin-top:20px">
            <img src="https://beenetmunication.com/wp-content/uploads/2022/11/OTP-1024x1024.png" alt="no image" style="width:100%;height:100%;object-fit:cover;margin:0 auto;display:flex;align-items:center;justify-content:center"/>
            </div>
            <div style="font-size:20px;font-weight:600;text-align:center;margin-top:20px;">
            Feel free to ask me anything. Stay curious and keep pushing forward!
            </div>
            <div style="text-align:center;margin-top:30px;font-size:20px;font-weight:600">
  OTP Here :  <span style="color:orange;font-weight:600;font-size:28px">${otp}</span>          
            </div>
            </div>
            </div>`
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
        to: "kalaimca685@gmail.com",
        subject: 'New User Visited Your Website',
        html: `<div style="text-align:center;">
       <h1>Thank You for Sending Mail ${mail}</h1>
        </div>`
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