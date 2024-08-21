import Zoom_auth from "../../Models/auth/Zoom_auth.js";
import bcrypt from 'bcrypt';
import jwt  from 'jsonwebtoken';
// create user
export const LoginUser=async(req,res)=>{
    try {
        const {email,password,role}=req.body;

        console.log(req.body)
        const existUser=await Zoom_auth.findOne({email});
        if(existUser)
        {
const token=await jwt.sign({_id:existUser?._id},process.env.TOKEN, { expiresIn: "10d" });
return res.status(200).json({mesage:"User Login Successfully",statue:true,data:existUser,token:token})
        }
        else{
            const hashedPassword=await bcrypt.hashSync(password,10)
            const response=await Zoom_auth.create({
                email,
                password:hashedPassword,
                role
            });
            await response.save();
const token=await jwt.sign({_id:response?._id},process.env.TOKEN, { expiresIn: "10d" });
return res.status(200).json({mesage:"User Login Successfully",statue:true,data:response,token:token})
        }
    } catch (error) {
return res.status(404).json({mesage:"Something Went Wrong",statue:true,data:response,token:token})
        
    }
}