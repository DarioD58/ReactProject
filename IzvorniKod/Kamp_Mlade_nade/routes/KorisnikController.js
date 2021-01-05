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

    // Dohvaca informacije o grupama i animatorima korisnika
    async userInfo(req, res, next) {
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

            for(let i = 0; i < grupe.lenght; i++){
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

    // Dohvaca informacije o aktivnostima korisnika
    async userActivities(req, res, next) {
        let korisnik = req.cookies.korisnik;
        
        try {
        if(korisnik.statusKorisnik == "sudionik") {
            let sudionik = await Sudionik.fetchSudionikByUsername(korisnik.korisnickoIme);
            let aktivnosti = await sudionik.fetchSudionikAcitvities()

            return JSON.stringify({
                aktivnosti : aktivnosti
            });
        } else if(korisnik.statusKorisnik == "animator") {
            let animator = await Animator.fetchAnimatorByUsername(korisnik.korisnickoIme);
            let aktivnosti = await animator.fetchSudionikAcitvities()

            return JSON.stringify({
                aktivnosti : aktivnosti
            });

        } else if(korisnik.statusKorisnik == "organizator") {
            return JSON.stringify({
                poruka : "Što organizator traži ovdje?"
            });

        } else {
            throw new Error("Nevaljan status korisnika!");
        }

        } catch (error) {
            return JSON.stringify({error: "Greška pri dohvatu informacija aktivnosti korisnika! " + error.message});
        }
      
    }


}

let korisnikController = new KorisnikController();

// za prikaz info o korisniku
router.get("/", async (req, res, next) => {
    let data = JSON.parse( await korisnikController.userInfo(req, res, next));
    if(data.error != null){
        res.status(400).json(data);
    } else {
        res.json(data);
    }
});

// za prikaz aktivnosti korisnika
router.get("/aktivnosti", async (req, res, next) => {
    let data = JSON.parse( await korisnikController.userActivities(req, res, next));
    if(data.error != null){
        res.status(400).json(data);
    } else {
        res.json(data);
    }
});




module.exports = router;