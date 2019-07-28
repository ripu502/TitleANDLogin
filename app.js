const express = require('express');
const db = require('./config/postgresDatabase');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const router = require('./routes/router');

// setting the port
const port = process.env.PORT || 3000;

// this file is not include generate yourself as samplekeys.js in
// the same directory
const keys = require('./config/keys');

const app = express();

// serving static files
app.use(express.static('public'))

// bodyparser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// setting the templating Engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// something for the passportjs
app.use(flash());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));
app.use(cookieParser());
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// checking the Postgres dataBase connection
db.authenticate()
    .then(() => {
        console.log('databse connected');
    })
    .catch(() => {
        console.log('some error occured');
    })

// setting the router for views and routing URLs
app.use(router);

// mongoDb connection string
const mongoURI = `mongodb+srv://${keys.MongoUser}:${keys.MongoPassword}@cluster0-jywn3.mongodb.net/${keys.MongoDataBase}?retryWrites=true&w=majority`;

// connecting the server with the mongoCloud and starting the server
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
