const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { route } = require('./routes/routes');
const cors = require('cors');

const routes = require('./routes/routes');

const MONGO_URL = 'mongodb+srv://michael:123456789q@cluster0.puo0h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const PORT = 8081;

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(routes);

async function start() {
    try {
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useFindAndModify: false,
        })

        app.listen(PORT, () => {
            console.log('Server started...');
        });
    }
    catch (ex) {
        console.log(ex);
    }
}

start();