import { Router } from "express";
import { GetLogin_Users, LoginUser } from "./ZoomControll.js";
const zoom_auth_router=Router();
zoom_auth_router.post("/login",LoginUser)
zoom_auth_router.get("/users",GetLogin_Users)

export default zoom_auth_router