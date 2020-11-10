const express = require('express');
const router = express.Router();
const Korisnik = require('../models/Korisnik');
const { fetchOrganizatorkByUsername } = require('../models/Organizator');
const { fetchSudionikByUsername } = require('../models/Sudionik');

router.post("/", async (req, res, next) => {
    let loginData = JSON.parse(req.body);
    try {
        let korisnik = await Korisnik.fetchKorisnikByUsername(loginData.korime);
        if(korisnik.isPersisted() && korisnik.checkPass(loginData.lozinka)){
            let status = korisnik.getStatus();
            
            let currentUser;
            switch(status){
                case "sudionik": currentUser = fetchSudionikByUsername();
                case "animator": currentUser = fetchAnimatorkByUsername();
                case "organizator": currentUser = fetchOrganizatorkByUsername();
            }

            req.session.user = currentUser;
        }
        res.json(currentUser);
    } catch (err) {
        res.json("Korisnik ne postoji.");
    }

});

module.exports = router;