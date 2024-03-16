import express from 'express';
import seller_router_auth from '../Controlls/auth/seller/index.js';

const router = express.Router();

// seller auth

router.use("/seller/auth", seller_router_auth)


export default router;