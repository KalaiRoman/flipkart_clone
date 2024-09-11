import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import router from './Routing/Routing.js';
import helmet from 'helmet';
import { Server } from 'socket.io';
import http from 'http';
import { errorMiddleware, notFound } from './Middleware/errorMiddleware.js';
import ConnectDB from './Config/Db.js';
import morgan from 'morgan';
dotenv.config();
ConnectDB();
const app = express();

const server=http.createServer(app);
const io=new Server(server);
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ credentials: true, origin: ["http://localhost:3000", "http://localhost:3001","http://localhost:3002","https://kalaiportfolio.onrender.com","https://kalaiportfolio.vercel.app","https://admin-flipkart.onrender.com","https://zoom-meet-chi.vercel.app"] }));
app.use("/flip/ecommerce", router);
app.use(notFound)
app.use(errorMiddleware)
// app.listen(process.env.PORT, () => {
//     console.log(`server Running http://localhost:${process.env.PORT}`)
// })
var countdata=0;
io.on("connection",(socket)=>{
    console.log("User Conect Id : ",socket.id)
    socket.on("create-meeting",(mes)=>{
    io.emit("new-meeting",mes)

})

io.emit("user_count",countdata);

socket.on("disconnect",function(){
    countdata--;
io.emit("user_count",countdata);

})
})


server.listen(process.env.PORT, () => {
    console.log(`server Running http://localhost:${process.env.PORT}`)
})