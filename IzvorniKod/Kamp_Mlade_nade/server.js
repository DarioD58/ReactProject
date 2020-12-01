const express = require('express');
const app = express();
const cors = require("cors");
const db = require('./db');
const pg = require('pg');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

//middleware - ruteri
const HomeController = require('./routes/HomeController');
const LoginController = require('./routes/LoginController');
const LogoutController = require('./routes/LogoutController');
const ApplyController = require('./routes/ApplyController');
const RegisterController = require('./routes/RegisterController');

//middleware
app.use(cors());
app.use(express.json());


//middleware - sjednice
app.use(session({
    secret: "Kamp Mlade nade",
    resave: false,
    saveUninitialized: true,
    store: new pgSession({pool: db.pool}),
    cookie: {maxAge:86400000, httpOnly: true}  
})
)


//definicija ruta
app.use('/', HomeController);
app.use('/login', LoginController);
app.use('/logout', LogoutController);
app.use('/apply', ApplyController);
app.use('/register', RegisterController);


var port = 5000;
app.listen(port, () => {
    console.log("server has started on port " + port);
})