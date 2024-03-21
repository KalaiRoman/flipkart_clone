import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import router from './Routing/Routing.js';
import bodyparser from 'body-parser';
import helmet from 'helmet';
import { errorMiddleware, notFound } from './Middleware/errorMiddleware.js';
import ConnectDB from './Config/Db.js';
// env
dotenv.config();
// db connect
ConnectDB();
// app
const app = express();
app.use(express.json());

app.use(bodyparser.urlencoded({
    parameterLimit: 100000,
    limit: '50mb',
    extended: true,
    type: 'application/json'
}));

var whitelist = ['http://localhost:3000', 'https://admin-flipkart.onrender.com/', 'https://seller-flipkart.onrender.com/', 'https://flipkart-pvag.onrender.com/']
var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}
// helmet secure
app.use(helmet());

app.use(cors({ credentials: true, origin: "*" }));

// routing apis
app.use("/flip/ecommerce", router);
// listing port in db server

// error middleware
app.use(notFound)
app.use(errorMiddleware)
app.listen(process.env.PORT, () => {
    console.log(`server Running http://localhost:${process.env.PORT}`)
})

