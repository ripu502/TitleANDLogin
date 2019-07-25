
const express = require('express');

const router = require('./routes/router');

const app = express();

// setting the port
const port = process.env.PORT || 3000;

// setting the templating Engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// setting the router for views and routing URLs
app.use(router);

// start listening to the server
app.listen(port, () => {
    console.log(`server is running at http://localhost:3000`);
})