import { Router } from "express";
import { LoginUser } from "./ZoomControll.js";
const zoom_auth_router=Router();
zoom_auth_router.post("/login",LoginUser)
export default zoom_auth_router