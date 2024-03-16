import SellerModel from "../../../Models/auth/Seller_models.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createSeller = async (req, res) => {
    const {
        username,
        email,
        password,
        avatar
    } = req.body;
    try {
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
        const token = jwt.sign({ _id: newSeller._id }, process.env.token, { expiresIn: "10d" });
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
        if (existingUser) return res.status(400).json({ message: "User Already Exists!" });

        const passwordNumber = Math.random() * 97867;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(passwordNumber, salt);
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
        const token = jwt.sign({ _id: newSeller._id }, process.env.token, { expiresIn: "10d" });
        return res.status(201).json({ message: "Seller Registered Successfully", user: newSeller, token });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });

    }
}