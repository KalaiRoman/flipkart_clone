
import express from 'express';
import { approvalProduct, getAllProduct, getSingleProduct, ProductchatAdmin, rejectProduct } from './Admin_controlls_approval.js';

const admin_router_approval = express.Router();

admin_router_approval.post("/product/approval", approvalProduct)
admin_router_approval.post("/product/reject", rejectProduct)
admin_router_approval.post("/products", getAllProduct)
admin_router_approval.get("/get/product/:id", getSingleProduct)
admin_router_approval.put("/product/chat", ProductchatAdmin)
export default admin_router_approval;