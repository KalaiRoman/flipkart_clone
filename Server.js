import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import router from './Routing/Routing.js';
import helmet from 'helmet';
import { errorMiddleware, notFound } from './Middleware/errorMiddleware.js';
import ConnectDB from './Config/Db.js';
import corsMiddleware from './Middleware/cors.js';
import morgan from 'morgan';
// env
dotenv.config();
// db connect
ConnectDB();
// app
const app = express();
app.use(express.json());



app.use(morgan("dev"));

// helmet secure
app.use(helmet());

app.use(cors({ credentials: true, origin: ["http://localhost:3000", "http://localhost:3001","https://kalaiportfolio.onrender.com","https://kalaiportfolio.vercel.app"] }));
// routing apis
app.use("/flip/ecommerce", router);
// listing port in db server
// error middleware
app.use(notFound)
app.use(errorMiddleware)
app.listen(process.env.PORT, () => {
    console.log(`server Running http://localhost:${process.env.PORT}`)
})

