const express = require('express');
const app = express();
const cors = require("cors");
const path = require('path');
const pg = require('pg')
const db = require('./db')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)

//middleware - ruteri
const homeRouter = require('./routes/home.routes');
const loginRouter = require('./routes/login.routes');
const logoutRouter = require('./routes/logout.routes');
const applicationRouter = require('./routes/application.routes');
const registerRouter = require('./routes/register.routes');

//middleware - dekodiranje parametara
app.use(express.static(path.join(__dirname, 'public')));

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
app.use('/', homeRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/application', applicationRouter);
app.use('/register', registerRouter);


var port = 5000;
app.listen(port, () => {
    console.log("server has started on port " + port);
})