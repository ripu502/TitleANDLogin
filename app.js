
const express = require('express');

const mongoose = require('mongoose');

const router = require('./routes/router');

// this file is not include generate yourself as samplekeys.js in
// the same directory
const keys = require('./config/keys');

const app = express();

// setting the port
const port = process.env.PORT || 3000;

// setting the templating Engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// setting the router for views and routing URLs
app.use(router);



// connecting to the mongoose MongoCloud and starting the server
const mongoURI = `mongodb+srv://${keys.MongoUser}:${keys.MongoPassword}@cluster0-jywn3.mongodb.net/${keys.MongoDataBase}?retryWrites=true&w=majority`;

mongoose.connect(mongoURI, { useNewUrlParser: true })
    .then((result) => {
        console.log('connected');

        // start listening to the server
        app.listen(port, () => {
            console.log(`server is running at http://localhost:3000`);
        })
    }).catch((err) => {
        console.log(`some err is occured in connecting to mongo ${err}`);
    });


