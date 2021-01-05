const express = require('express');
const router = express.Router();
const Controller = require('./Controller');
const Grupa = require('../models/Grupa');
const Sudionik = require('../models/Sudionik');
const Animator = require('../models/Animator');

class KorisnikController extends Controller {
    constructor(){
        super();
    }

    async get(req, res, next) {
        let korisnik = req.cookies.korisnik;

        try {
        if(korisnik.statusKorisnik == "sudionik") {
            let sudionik = await Sudionik.fetchSudionikByUsername(korisnik.korisnickoIme);
            let grupa = await Grupa.fetchGrupaById(sudionik.id_grupa);
            let clanovi = await grupa.fetchAllMembers();
            let animatori = await sudionik.fetchSudionkAnimators();
            
            let grupaSClanovima = {
                grupa: grupa,
                clanoviGrupe : clanovi
            }

            return JSON.stringify({
                grupa : grupaSClanovima,
                animatori : animatori
            });


        } else if(korisnik.statusKorisnik == "animator") {
            let grupe = await Grupa.fetchAllGrupa();
        
            let grupeSClanovima = [];

            for(let i = 0; i < grupe.lenght(); i++){
                let clanovi = await grupe[i].fetchAllMembers();
                let grupaSClanovima = {
                    grupa: grupe[i],
                    clanoviGrupe : clanovi
                }
                grupeSClanovima.push(grupaSClanovima);
            }

            let animtori = await Animator.fetchAllAnimator();

            return JSON.stringify({
                grupe : grupeSClanovima,
                animatori : animtori
            });

        } else if(korisnik.statusKorisnik == "organizator") {
            return JSON.stringify({
                poruka : "Što organizator traži ovdje?"
            });

        } else {
            throw new Error("Nevaljan status korisnika!");
        }

        } catch (error) {
            return JSON.stringify({error: "Greška pri dohvatu informacija korisnika! " + error.message});
        }
      
    }

}

let korisnikController = new KorisnikController();

router.get("/", async (req, res, next) => {
    let data = JSON.parse( await korisnikController.get(req, res, next));
    if(data.error != null){
        res.status(400).json(data);
    } else {
        res.json(data);
    }
});



module.exports = router;