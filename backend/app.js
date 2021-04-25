const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');

const port = 3000

const mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose
    .connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        const app = express();
        app.use(bodyParser.json())

        app.use('/api/v0', routes);

        app.listen(port, () => {
            console.log(`Server listening at http://localhost:${port}`)
        })
    });

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));