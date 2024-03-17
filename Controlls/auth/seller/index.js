import express from 'express';
import { GoogleOauthRegister, OtpConfirm, UpdateProfileImage, createSeller, getUser, updateUser, userLogin } from './Seller_controll.js';
import { verifyToken } from './../../../Middleware/Tokenverification.js';
import upload from '../../../Middleware/Multerurl.js';
const seller_router_auth = express.Router();
seller_router_auth.post("/register", createSeller)
seller_router_auth.post("/google/register", GoogleOauthRegister)
seller_router_auth.post("/login", userLogin)
seller_router_auth.post("/otp", OtpConfirm)
seller_router_auth.get("/get", verifyToken, getUser)
seller_router_auth.put("/update", verifyToken, updateUser)
seller_router_auth.post("/update/image", verifyToken, upload.single("image"), UpdateProfileImage)




export default seller_router_auth;
