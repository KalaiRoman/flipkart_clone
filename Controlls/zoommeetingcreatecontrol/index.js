import { Router } from "express";
import { Create_Meeting, Edit_Meeting, Edit_status_Meeting, Get_Meetings, Single_Meeting,SendMail_user ,Track_meeting_mail, Get_Meetings_over_all} from "./ZoomMeetingCreateControl.js";
import { verifyToken } from './../../Middleware/Tokenverification.js';
const create_meeting_router=Router();
create_meeting_router.post("/create",verifyToken,Create_Meeting)
create_meeting_router.get("/get",verifyToken,Get_Meetings)
create_meeting_router.get("/single/:id",verifyToken,Single_Meeting)
create_meeting_router.put("/edit/:id",verifyToken,Edit_Meeting)
create_meeting_router.put("/status/:id",verifyToken,Edit_status_Meeting)
create_meeting_router.get("/send-mail/:id",verifyToken,SendMail_user)
create_meeting_router.post("/track-mail",verifyToken,Track_meeting_mail)
create_meeting_router.get("/get-zoom-meet",Get_Meetings_over_all)
export default create_meeting_router;
