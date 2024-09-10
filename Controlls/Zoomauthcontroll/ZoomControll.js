import Zoom_auth from "../../Models/auth/Zoom_auth.js";
import bcrypt from 'bcrypt';
import jwt  from 'jsonwebtoken';
// create user
export const LoginUser = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        const existUser = await Zoom_auth.findOne({ email });
        if (existUser) {
            if (existUser.role !== role) {
                return res.status(500).json({ message: "User Already Register This Email Id", status: false });
            }
            const isMatch = await bcrypt.compare(password, existUser.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid credentials", status: false });
            }
            const token = jwt.sign({ _id: existUser._id }, process.env.TOKEN, { expiresIn: "10d" });
            return res.status(200).json({ message: "User Login Successfully", status: true, data: existUser, token });

        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new Zoom_auth({
                email,
                password: hashedPassword,
                role
            });

            const savedUser = await newUser.save();
            const token = jwt.sign({ _id: savedUser._id }, process.env.TOKEN, { expiresIn: "10d" });
            return res.status(200).json({ message: "User Registered Successfully", status: true, data: savedUser, token });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something Went Wrong", status: false });
    }
};


// get uers

export const GetLogin_Users=async(req,res)=>{
    try {
        

        const response=await Zoom_auth.find({});

        console.log(response,'response')

        

        if(response)
        {
const filterData=response?.filter((item,index)=>item?.role==="student");

console.log(filterData,'filterData')
res.status(200).json({message:"success",status:true,data:filterData})
        }
        else{
res.status(200).json({message:"success",status:true,data:[]})

        }
        
    } catch (error) {
        res.status(404).json({message:"failed",status:false,error:"Something Went Wrong"})

    }
}