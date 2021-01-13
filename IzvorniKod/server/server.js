const express = require('express');
const app = express();
const cors = require("cors");
const db = require('./db');
const pg = require('pg');
var cookieParser = require('cookie-parser');
const pgSession = require('connect-pg-simple');

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
/* app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
  })); */

app.use(express.json());

// middleware - cookie
app.use(cookieParser());

// definicija ruta
app.use('/', HomeController);
app.use('/login', LoginController);
app.use('/logout', LogoutController);
app.use('/apply', ApplyController);
app.use('/register', RegisterController);
app.use('/prijave', PrijavaController);
app.use('/grupe', GrupaController);
app.use('/kamp', KampController);
app.use('/aktivnost', AktivnostController);
app.use('/korisnik', KorisnikController);

// pokreni server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("server has started on port " + PORT);
})