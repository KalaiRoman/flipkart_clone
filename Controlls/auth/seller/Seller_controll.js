import SellerModel from "../../../Models/auth/Seller_models.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import otp_shema from "../../../Models/auth/otp_shema.js";
import otpGenerator from 'otp-generator';
import { v2 as cloudinary } from 'cloudinary';
import Admin_models from "../../../Models/auth/Admin_models.js";


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "kalairoman70@gmail.com",
        pass: "rkaasoiricuaignl",
    }
});


export const createSeller = async (req, res) => {
    const {
        username,
        email,
        password,
        avatar
    } = req.body;
    try {

        if (!username || !email || !password) return res.status(500).json({ message: "Please Fill all fileds" })
        const existingUser = await SellerModel.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User Already Exists!" });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newSeller = new SellerModel({
            username,
            email,
            password: hashedPassword,
            avatar,
            type: "seller",
            roleId: 2,
            sellerStatus: true,
        });
        await newSeller.save();
        const token = jwt.sign({ _id: newSeller._id }, process.env.TOKEN, { expiresIn: "10d" });
        return res.status(201).json({ message: "Seller Registered Successfully", user: newSeller, token });
    } catch (error) {
        
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
// google oauth login user

export const GoogleOauthRegister = async (req, res) => {

    const {
        username,
        email,
        avatar
    } = req.body;
    try {
        const existingUser = await SellerModel.findOne({ email });
        // if (existingUser) return res.status(400).json({ message: "User Already Exists!" });

        if (existingUser) {
            if (existingUser?.sellerStatus === true) {
                const token = jwt.sign({ _id: existingUser._id }, process.env.TOKEN, { expiresIn: "10d" });
                const { password, ...otherData } = existingUser?._doc;
                CallBackOtp(existingUser?._id, email)
                return res.status(200).json({ message: "Success", user: otherData, token });

            }
            else {
                return res.status(500).json({ message: "Please Contact Admin!!!" });
            }

        }
        else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(username, salt);
            const newSeller = new SellerModel({
                username,
                email,
                password: hashedPassword,
                avatar,
                type: "seller",
                roleId: 2,
                sellerStatus: true,
            });
            await newSeller.save();
            const token = jwt.sign({ _id: newSeller._id }, process.env.TOKEN, { expiresIn: "10d" });
            return res.status(201).json({ message: "Seller Login Successfully", user: newSeller, token });
        }




    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

// login
export const userLogin = async (req, res) => {

    const {
        email,
        password
    } = req.body;
    try {
        const existingUser = await SellerModel.findOne({ email });
        if (existingUser) {
            if (existingUser?.sellerStatus === true) {
                const hashedPassword = await bcrypt.compare(password, existingUser?.password);
                if (hashedPassword) {
                    const token = jwt.sign({ _id: existingUser._id }, process.env.TOKEN, { expiresIn: "10d" });
                    const { password, ...otherData } = existingUser?._doc;
                    CallBackOtp(existingUser?._id, email)
                    return res.status(200).json({ message: "Success", user: otherData, token });
                }
                else {
                    return res.status(500).json({ message: "Wrong Password" });
                }
            }
            else {
                return res.status(500).json({ message: "Please Contact Admin!!!" });
            }
        }
        else {
            return res.status(400).json({ message: "User Not Register!" });

        }


    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


// opt call Back

const CallBackOtp = async (_id, email) => {
    try {
        const response = await otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
        await otp_shema.findOneAndUpdate({
            email: email
        }, { otp: response, userId: _id, roleId: 2 }, { new: true, upsert: true, setDefaultsOnInsert: true });

        var mailOptions = {
            from: "kalairoman70@gmail.com",
            bcc: email,
            subject: 'Your Otp Here!',
            html: `<div style="text-align:center,background-color:"red"><h1>Your Otp : ${response} </h1></div>`
        };
        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error, "error");
            } else {
                console.log('Email sent');
            }
        });
    } catch (error) {

    }
}

// otp check

export const OtpConfirm = async (req, res) => {

    const { otp, userid } = req.body;

    try {
        const response = await otp_shema.findOne({ userId: userid });
        if (response?.otp == otp) {
            return res.status(200).json({ message: "Otp Correct" })
        }
        else {
            return res.status(500).json({ message: "Wrong Otp!" })
        }
    } catch (error) {
        return res.status(500).json({ message: error })

    }
}


// get user current

export const getUser = async (req, res) => {


    try {
        const response = await SellerModel.findById({ _id: req.userid });
        if (response) {
            return res.status(200).json({ message: "sucessfully", user: response })
        }
    } catch (error) {
        res.status(500).json({ message: error })

    }
}

// update user

export const updateUser = async (req, res) => {
    try {
        const response = await SellerModel.findByIdAndUpdate({ _id: req.userid }, req.body, { new: true });
        if (response) {
            return res.status(200).json({ message: "sucessfully" })
        }
    } catch (error) {
        res.status(500).json({ message: error })

    }
}



// update Profile Image

export const UpdateProfileImage = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
        cloudinary.uploader.upload(req.file.path, async (error, response) => {
            if (error) {
                return res.status(500).json({ message: 'Error uploading image to Cloudinary', error: error.message });
            }
            try {

                await SellerModel.findByIdAndUpdate({ _id: req.userid }, { avatar: response.secure_url, cloud_id: response.public_id }, { new: true });
                return res.status(200).json({ message: "Image uploaded successfully" });
            } catch (err) {
                return res.status(500).json({ message: 'Error saving image to database', error: err.message });
            }
        });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}
// get admin users


export const Adiminuser = async (req, res) => {
    try {

        const response = await Admin_models.find();


        if (response) {
            res.status(200).json({ message: "success", adminuser: response });

        }

    } catch (error) {
        res.status(500).json({ message: error });

    }
}

// chat

export const ChatUserseller = async (req, res) => {
    const { userid, message, type } = req.body;
    try {

        const data = {
            message: message,
            type: type
        }
        const response = await SellerModel.findByIdAndUpdate({ _id: userid }, {
            $push: { chat: data }
        }, { new: true });


        res.status(200).json({ message: "succesfully chat user" })

    } catch (error) {

    }
}