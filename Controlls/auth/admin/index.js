import express from 'express';
import { ChatUser, UpdateProfileImage, getAllUser, getUser, updateUser, userLogin } from './Admin_controlls.js';
import { verifyToken } from './../../../Middleware/Tokenverification.js';
import upload from '../../../Middleware/Multerurl.js';
const admin_router_auth = express.Router();
admin_router_auth.post("/login", userLogin)
admin_router_auth.post("/get", getUser)
admin_router_auth.get("/getall/users", getAllUser)
admin_router_auth.put("/update", verifyToken, updateUser)
admin_router_auth.post("/update/image", verifyToken, upload.single("image"), UpdateProfileImage)
admin_router_auth.post("/chat/admin-to-seller", ChatUser)

export default admin_router_auth;
