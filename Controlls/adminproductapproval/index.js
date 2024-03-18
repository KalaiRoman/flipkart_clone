
import express from 'express';
import { approvalProduct } from './Admin_controlls_approval';

const admin_router_approval = express.Router();

admin_router_approval.post("/admin/approval", approvalProduct)



export default admin_router_approval;