import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import router from './Routing/Routing.js';
import helmet from 'helmet';
import { errorMiddleware, notFound } from './Middleware/errorMiddleware.js';
import ConnectDB from './Config/Db.js';
import morgan from 'morgan';
dotenv.config();
ConnectDB();
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ credentials: true, origin: ["http://localhost:3000", "http://localhost:3001","http://localhost:3002","https://kalaiportfolio.onrender.com","https://kalaiportfolio.vercel.app"] }));
app.use("/flip/ecommerce", router);
app.use(notFound)
app.use(errorMiddleware)
app.listen(process.env.PORT, () => {
    console.log(`server Running http://localhost:${process.env.PORT}`)
})

