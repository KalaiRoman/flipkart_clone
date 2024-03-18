import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { v2 as cloudinary } from 'cloudinary';
import Admin_models from '../../../Models/auth/Admin_models.js';
import Seller_models from '../../../Models/auth/Seller_models.js';
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "kalairoman70@gmail.com",
        pass: "rkaasoiricuaignl",
    }
});






// login
export const userLogin = async (req, res) => {

    const {
        email,
        password
    } = req.body;

    try {
        const existingUser = await Admin_models.findOne({ email: email });
        if (existingUser) {
            // const hashedPassword = await bcrypt.compare(password, existingUser?.password);
            // if (hashedPassword) {
            const token = jwt.sign({ _id: existingUser._id }, process.env.TOKEN, { expiresIn: "10d" });
            const { password, ...otherData } = existingUser?._doc;
            return res.status(200).json({ message: "Success", user: otherData, token });
            // }
            // else {
            //     return res.status(500).json({ message: "Wrong Password" });
            // }

        }
        else {
            return res.status(400).json({ message: "User Not Register!" });

        }


    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


// opt call Back




// get user current

export const getUser = async (req, res) => {

    try {
        const response = await Seller_models.findById({ _id: req.body.userid });
        if (response) {
            return res.status(200).json({ message: "sucessfully", user: response })
        }
    } catch (error) {
        res.status(500).json({ message: error })

    }
}

// get all users

export const getAllUser = async (req, res) => {

    try {
        const response = await Seller_models.find({});
        if (response) {
            return res.status(200).json({ message: "sucessfully", users: response })
        }
    } catch (error) {
        res.status(500).json({ message: error })

    }
}

// update user

export const updateUser = async (req, res) => {
    try {
        const response = await Admin_models.findByIdAndUpdate({ _id: req.userid }, req.body, { new: true });
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

                await Admin_models.findByIdAndUpdate({ _id: req.userid }, { avatar: response.secure_url, cloud_id: response.public_id }, { new: true });
                return res.status(200).json({ message: "Image uploaded successfully" });
            } catch (err) {
                return res.status(500).json({ message: 'Error saving image to database', error: err.message });
            }
        });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

// chat users

export const ChatUser = async (req, res) => {
    const { userid, message, type } = req.body;
    try {

        const data = {
            message: message,
            type: type
        }
        const response = await Seller_models.findByIdAndUpdate({ _id: userid }, {
            $push: { chat: data }
        }, { new: true });


        res.status(200).json({ message: "succesfully chat user" })

    } catch (error) {

    }
}