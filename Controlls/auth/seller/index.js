import express from 'express';
import { createSeller } from './Seller_controll.js';
const seller_router_auth = express.Router();
seller_router_auth.post("/register", createSeller)
export default seller_router_auth;
