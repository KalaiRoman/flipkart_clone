import { Router } from 'express';
import { updateSellerApproval, updateSellerRejected } from './AdminapprovalSellers.js';

const seller_auth_router = Router();

seller_auth_router.post("/update/seller", updateSellerApproval)
seller_auth_router.post("/update/seller/reject", updateSellerRejected)


export default seller_auth_router;