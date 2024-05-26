import express from 'express';
import { createPlans, getPlans } from './Subscriptioncontrol.js';
const subscriptionrouter = express.Router();
subscriptionrouter.post("/create", createPlans)
subscriptionrouter.get("/get", getPlans)



export default subscriptionrouter;