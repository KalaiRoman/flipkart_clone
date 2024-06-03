import express from 'express';
import { verifyToken } from './../../../Middleware/Tokenverification.js';
import upload from '../../../Middleware/Multerurl.js';
import { Adiminuser, ChatUserportfolio, CreateandLogin, getUser, OtpConfirm,ChatUserDeleteportfolio,ChatUserStatusUpdateportfolio, chatMessageLike } from './Portfolio_controlls.js';
const portfolio_router_auth = express.Router();
portfolio_router_auth.post("/login-register",CreateandLogin )
portfolio_router_auth.post("/otp-confirmation",OtpConfirm )
portfolio_router_auth.get("/get", verifyToken, getUser)
portfolio_router_auth.post("/chat/portfolio-to-admin", verifyToken,ChatUserportfolio)
portfolio_router_auth.get("/get/admin",Adiminuser)
portfolio_router_auth.post("/chat/message/delete",verifyToken,ChatUserDeleteportfolio)
portfolio_router_auth.post("/chat/message/update/status",verifyToken,ChatUserStatusUpdateportfolio)
portfolio_router_auth.post("/chat/message/update/like",verifyToken,chatMessageLike)

export default portfolio_router_auth;
