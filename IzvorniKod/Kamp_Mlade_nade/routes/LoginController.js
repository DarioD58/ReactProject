const express = require('express');
const { stringify } = require('querystring');
const router = express.Router();
const Korisnik = require('../models/Korisnik');
const { fetchOrganizatorkByUsername } = require('../models/Organizator');
const { fetchSudionikByUsername } = require('../models/Sudionik');
const Controller = require('./Controller');
const cookie = require('cookie');

class LoginController extends Controller{
    constructor(){
        super();
    }

    async post(req, res, next) {
        let loginData = req.body;
        try {
            let korisnik = await Korisnik.fetchKorisnikByUsername(loginData.korime);
            if(korisnik.isPersisted() && korisnik.checkPass(loginData.lozinka)){
                let status = korisnik.status;
                
                return JSON.stringify({
                    korisnickoIme : loginData.korime,
                    statusKorisnik : status
                });
            } else {
                throw new Error();
            }
            
          
        } catch (err) {
            console.error(err);
            return JSON.stringify({error : "Korisnik ne postoji."});
        }
    }
}

let login = new LoginController();

router.post("/", async (req, res, next) => {
    let data = JSON.parse( await login.post(req, res, next));
    if(data.error != null){
        res.status(400).json(data);
    } else {
        //res.setHeader('Set-Cookie', cookie.serialize('korisnik', JSON.stringify(data), {httpOnly: false, maxAge: 60*60*24}));
        // ILI 
        res.cookie("korisnik", JSON.stringify(data), { httpOnly : false, maxAge: 60*60*24*1000});
        res.json(data);
    }
});

module.exports = router;