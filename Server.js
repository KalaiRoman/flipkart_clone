import dotenv from 'dotenv';

import express from 'express';
dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    return res.send("welcome to kalai")
})


app.listen(process.env.PORT, () => {
    console.log(`server Running ${process.env.PORT}`)
})


console.log("kalia")