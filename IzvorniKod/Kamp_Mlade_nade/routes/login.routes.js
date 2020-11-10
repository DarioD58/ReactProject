const express = require('express');
const router = express.Router();
const Korisnik = require('../models/Korisnik');
const { fetchOrganizatorkByUsername } = require('../models/Organizator');
const { fetchSudionikByUsername } = require('../models/Sudionik');

router.post("/", async (req, res, next) => {
    let loginData = req.body;
    try {
        /*
        let userStatus = "";
        if(req.body.korime == "voditeljKampa" && req.body.lozinka == "voditelj123")
            userStatus = "organizator";
        */
  
        let korisnik = await Korisnik.fetchKorisnikByUsername(loginData.korime);
        if(korisnik.isPersisted() && korisnik.checkPass(loginData.lozinka)){
            let status = korisnik.getStatus();
            
            let userStatus = "";
            switch(status){
                case "sudionik": userStatus = fetchSudionikByUsername();
                case "animator": userStatus = fetchAnimatorkByUsername();
                case "organizator": userStatus = fetchOrganizatorkByUsername();
                default : userStatus = "";
            }

            req.session.userStatus = userStatus;
            req.session.userName = req.body.korime;
            
            res.json({
                userStatus : userStatus,
                userName : req.body.korime
            });
        }
        
      
    } catch (err) {
        res.json("Korisnik ne postoji.");
    }

});

module.exports = router;