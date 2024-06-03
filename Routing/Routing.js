import express from 'express';
import seller_router_auth from '../Controlls/auth/seller/index.js';
import productrouter from '../Controlls/product/productcontrolls/index.js';
import admin_router_auth from '../Controlls/auth/admin/index.js';
import admin_router_approval from '../Controlls/adminproductapproval/index.js';
import seller_auth_router from '../Controlls/adminapprovalsellers/index.js';
import subscriptionrouter from '../Controlls/subsciptioncontrol/index.js';
import sellersubscrionrouter from '../Controlls/sellersubscritionplan/index.js';
import portfolio_router_auth from '../Controlls/auth/portfoliocontrolls/index.js';
import portfolio_router_auth_mil from '../Controlls/auth/portfoliomailcontrolls/index.js';

const router = express.Router();

// seller auth

router.use("/seller/auth", seller_router_auth)

// product

router.use("/seller/product", productrouter)
router.use("/seller/plans", subscriptionrouter)
router.use("/seller/subscription", sellersubscrionrouter)

// admin
router.use("/admin/auth", admin_router_auth)
router.use("/admin/approval", admin_router_approval)
router.use("/admin/approval", seller_auth_router)
router.use("/admin/plan", subscriptionrouter)




// portfolio user

router.use("/portfolio", portfolio_router_auth)


// mail send

router.use("/portfolio/mail", portfolio_router_auth_mil)










export default router;