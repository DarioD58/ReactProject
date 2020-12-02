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
            let user = await fetchKorisnikByUsername(req.body.korime);
            if(req.body.korime == user.korisnicko_ime){
                if(user.status != "sudionik" && user.status != "animator") throw new Error();
                console.log(req.body.lozinka)
                // registrira korisnika u bazu
                await user.registerKorisnik(req.body.lozinka);
                console.log("Tu sam")
                req.session.userStatus = user.status;
                req.session.userName = req.body.korime;
            
                return JSON.stringify({
                    korisnicko_ime: req.body.korime,
                    status: user.status
                });
            }
        } catch (error) {
            return JSON.stringify({error: "Korisnik s korisničkim imenom " + req.body.korime + " ne postoji."});
        }
      
    }
}

let register = new RegisterController();
router.post("/", async (req, res, next) => {
    let data = JSON.parse( await register.post(req, res, next));
    if(data.error != null){
        res.status(400).json(data);
    } else {
        res.json(data);
    }
});

module.exports = router;