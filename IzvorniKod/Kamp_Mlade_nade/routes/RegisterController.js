const express = require('express');
const { fetchKorisnikByUsername } = require('../models/Korisnik');
const router = express.Router();
const Controller = require('./Controller');

class RegisterController extends Controller {
    constructor(){
        super();
    }

    async post(req, res, next) {
        if(req.body.lozinka != req.body.lozinka2){
            return JSON.stringify({error: "Nemoguće se dogodilo"});
        }
    
        try {
            let user = fetchKorisnikByUsername(req.body.korime);
            if(req.body.korime == user.korisnicko_ime){
                if(user.status != "sudionik" || user.status != "animator") throw new Error();
                
                // registrira korisnika u bazu
                user.registerUser(lozinka);
                
                req.session.userStatus = user.status;
                req.session.userName = req.body.korime;
            
                res.json("Prijavljen novi " + user.status + " " + req.body.korime);
            }
        } catch (error) {
            res.json("Korisnik s korisničkim imenom " + req.body.korime + " ne postoji.");
        }
      
    }
}

let register = new RegisterController();
router.post("/", async (req, res, next) => {
    let data = JSON.parse( await register.post(req, res, next));
    res.json(data);
});

module.exports = router;