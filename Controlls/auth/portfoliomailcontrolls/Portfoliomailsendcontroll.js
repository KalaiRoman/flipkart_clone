
// // create

// import portfolio_mail_models from "../../../Models/auth/portfolio_mail_models.js";
// import nodemailer from 'nodemailer';
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: "kalairoman70@gmail.com",
//         pass: "rkaasoiricuaignl",
//     }
// });
// export const createMail=async(req,res)=>{
//     try {

//         const {email,username,message}=req.body;
//         const existMail=await portfolio_mail_models.findOne({email});
//         if(existMail) return res.status(404).json({message:"Email Already Exsists!"});
//         const response=await portfolio_mail_models({
//             email,
//             username,
//             message,
//             type: "portfoliouser",
//             roleId:4,
//         })
//         await response.save();
//         const mailOptions = {
//             from: "kalairoman70@gmail.com",
//             to: "kalaimca685@gmail.com",
//             subject: 'New User Visited Your Website',
//             html: `<div style="text-align:center;">
//            <h1>Thank You for Sending Mail ${email} ${username}</h1>
//             </div>`
//         };
//         await transporter.sendMail(mailOptions);
//         return res.status(201).json({message:"Created Successfully"});
        

        
//     } catch (error) {
//         res.status(404).json({message:error});
//     }
// }