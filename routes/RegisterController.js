const express = require('express');
const { fetchKorisnikByUsername } = require('../models/Korisnik');
const router = express.Router();
const Controller = require('./Controller');
const cookie = require('cookie');

class RegisterController extends Controller {
    constructor(){
        super();
    }

    async post(req, res, next) {
        if(req.body.lozinka != req.body.lozinka2){
            return JSON.stringify({error: "Nemoguće se dogodilo"});
        }

        try {
            let korisnik = await fetchKorisnikByUsername(req.body.korime);
            if(req.body.korime == korisnik.korisnicko_ime){
                if(korisnik.status != "sudionik" && korisnik.status != "animator") throw new Error();

                // registrira korisnika u bazu
                await korisnik.registerKorisnik(req.body.lozinka);
            
                return JSON.stringify({
                    korisnickoIme: req.body.korime,
                    statusKorisnik: korisnik.status
                });
            }
        } catch (error) {
            return JSON.stringify({error: "Korisnik s korisničkim imenom " + req.body.korime + " ne postoji."});
        }
      
    }
}

let registerController = new RegisterController();

router.post("/", async (req, res, next) => {
    let data = JSON.parse( await registerController.post(req, res, next));
    if(data.error != null){
        res.status(400).json(data);
    } else {
        //res.setHeader('Set-Cookie', cookie.serialize('korisnik', JSON.stringify(data), {httpOnly: false, maxAge: 60*60*24}));
        // ILI 
        res.cookie("korisnik", JSON.stringify(data), { httpOnly : false, maxAge: 60*60*24});
        res.json(data);
    }
});

module.exports = router;