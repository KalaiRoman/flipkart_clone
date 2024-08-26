import { Router } from "express";
import { Create_mail, find_all_mail, find_delete_mail, find_edit_mail, find_single_mail } from "./ZoomMettingUsers.js";
import { verifyToken } from './../../Middleware/Tokenverification.js';


const zoom_meet_user_router=Router();

zoom_meet_user_router.post("/create",verifyToken,Create_mail)
zoom_meet_user_router.get("/get",verifyToken,find_all_mail)
zoom_meet_user_router.get("/get/:id",verifyToken,find_single_mail)
zoom_meet_user_router.put("/edit/:id",verifyToken,find_edit_mail)
zoom_meet_user_router.delete("/delete/:id",verifyToken,find_delete_mail)
export default zoom_meet_user_router;