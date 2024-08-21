import { Router } from "express";
import { Create_Meeting, Get_Meetings } from "./ZoomMeetingCreateControl.js";
import { verifyToken } from './../../Middleware/Tokenverification.js';
const create_meeting_router=Router();
create_meeting_router.post("/create",verifyToken,Create_Meeting)
create_meeting_router.get("/get",verifyToken,Get_Meetings)

export default create_meeting_router;