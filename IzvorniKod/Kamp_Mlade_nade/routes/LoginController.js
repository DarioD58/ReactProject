const express = require('express');
const { stringify } = require('querystring');
const router = express.Router();
const Korisnik = require('../models/Korisnik');
const { fetchOrganizatorkByUsername } = require('../models/Organizator');
const { fetchSudionikByUsername } = require('../models/Sudionik');
const Controller = require('./Controller');

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
    
                req.session.userStatus = status;
                req.session.userName = req.body.korime;
                
                return JSON.stringify({
                    userStatus : status,
                    userName : req.body.korime
                });
            }
            
          
        } catch (err) {
            console.error(err);
            return JSON.stringify({error : "Korisnik ne postoji."});
        }
    }
}

let login = new LoginController();

router.post("/", async (req, res, next) => {
    let data = JSON.parse(await login.post(req, res, next));
    res.json(data);
});

module.exports = router;