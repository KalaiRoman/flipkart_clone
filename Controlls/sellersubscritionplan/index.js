import express from 'express';
import { createOrderSubscription, FreeSubscriptionData } from './sellersubscritionPlan.js';
import { verifyToken } from '../../Middleware/Tokenverification.js';
const sellersubscrionrouter = express.Router();
sellersubscrionrouter.post("/create", verifyToken, createOrderSubscription)
sellersubscrionrouter.post("/create/free", verifyToken, FreeSubscriptionData)

export default sellersubscrionrouter;