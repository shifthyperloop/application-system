const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./router');
const cors = require('cors');

const port = 3000

const corsOptions = {
    origin: 'http://localhost:5000',
    optionsSuccessStatus: 200 // For legacy browser support
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

    app.use('/api/v0', router);
    app.use(errorHandler);

    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`)
    })
})

function errorHandler (err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify(err));
}