const express = require('express');
const app = express();
const cors = require("cors");
const db = require('./db');
const pg = require('pg');
var cookieParser = require('cookie-parser');
const pgSession = require('connect-pg-simple');
const path = require('path');


// middleware - ruteri
const HomeController = require('./routes/HomeController');
const LoginController = require('./routes/LoginController');
const LogoutController = require('./routes/LogoutController');
const ApplyController = require('./routes/ApplyController');
const RegisterController = require('./routes/RegisterController');
const PrijavaController = require('./routes/PrijavaController');
const GrupaController = require('./routes/GrupaController');
const KampController = require('./routes/KampController');
const AktivnostController = require('./routes/AktivnostController');
const KorisnikController = require('./routes/KorisnikController');


app.use(express.static(path.join(__dirname, 'client/build')));
// middleware
app.use(cors({
    credentials: true,
    origin: 'https://progi-kamp-mlade-nade.herokuapp.com'
  }));

app.use(express.json());

// middleware - cookie
app.use(cookieParser());

// definicija ruta
app.use('/api/home', HomeController);
app.use('/api/login', LoginController);
app.use('/api/logout', LogoutController);
app.use('/api/apply', ApplyController);
app.use('/api/register', RegisterController);
app.use('/api/prijave', PrijavaController);
app.use('/api/grupe', GrupaController);
app.use('/api/kamp', KampController);
app.use('/api/aktivnost', AktivnostController);
app.use('/api/korisnik', KorisnikController);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/src/index.html'));
});

// pokreni server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("server has started on port " + PORT);
})