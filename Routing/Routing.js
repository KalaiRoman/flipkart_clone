import express from 'express';
import seller_router_auth from '../Controlls/auth/seller/index.js';
import productrouter from '../Controlls/product/productcontrolls/index.js';
import admin_router_auth from '../Controlls/auth/admin/index.js';

const router = express.Router();

// seller auth

router.use("/seller/auth", seller_router_auth)

// product

router.use("/seller/product", productrouter)


// admin
router.use("/admin/auth", admin_router_auth)





export default router;