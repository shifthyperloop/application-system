require('dotenv').config()

import mongoose from "mongoose";
import express, {NextFunction} from 'express';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes/router";

const port = 3000

const corsOptions = {
    origin: 'http://localhost:5000',
    optionsSuccessStatus: 200, // For legacy browser support
    credentials: true,
}

const mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", () => {
    console.log("DB connected successfully");

    const app = express();
    app.use(cors(corsOptions));
    app.use(bodyParser.json());
    app.use(cookieParser());

    app.use('/api/v0', router);
    app.use(errorHandler);

    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`)
    })
})

function errorHandler (err: any, req: express.Request, res: express.Response, next: NextFunction) {
    if (res.headersSent) {
        return next(err);
    }
    console.log(err);
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.json({error: err.message});
}