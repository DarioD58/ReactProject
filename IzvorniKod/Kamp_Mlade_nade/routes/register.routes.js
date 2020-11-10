const express = require('express');
const { fetchKorisnikByUsername } = require('../models/Korisnik');
const router = express.Router();


router.post("/", async (req, res, next) => {
    if(req.body.lozinka != req.body.lozinka2){
        res.json("Nemoguće se dogodilo");
    }

    try {
        let user = fetchKorisnikByUsername(req.body.korime);
        if(user.isPersisted() && req.body.korime == user.korisnicko_ime){
            if(user.status != "sudionik" || user.status != "animator") throw new Error();
            
            // registrira korisnika u bazu
            user.registerUser(lozinka);
            
            req.session.userStatus = user.status;
            req.session.userName = req.body.korime;
        
            res.json("Prijavljen novi " + user.status + " " + req.body.korime);
        }
    } catch (error) {
        res.json("Korisnik s korsiničkim imenom " + req.body.korime + " ne postoji.");
    }
  
});

module.exports = router;