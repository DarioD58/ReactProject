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
        let korisnik = JSON.parse(req.cookies.korisnik);

    
        try {
        if(korisnik.statusKorisnik == "sudionik") {
            let sudionik = await Sudionik.fetchSudionikByUsername(korisnik.korisnickoIme);
            let grupa = await Grupa.fetchGrupaById(sudionik.id_grupa);
            let clanovi = await grupa.fetchAllMembers();
            let animatori = await sudionik.fetchSudionkAnimators();
            
            let clanoviDTO =[];
            for(let i = 0; i < clanovi.length; i++) {
                let clan = {
                    korisnicko_ime : clanovi[i].korisnicko_ime,
                    ime: clanovi[i].ime,
                    prezime : clanovi[i].prezime,
                    email : clanovi[i].email,
                    br_tel: clanovi[i].br_tel,
                    id_grupa : grupa.id_grupa
                }

                clanoviDTO.push(clan);
            }

/*             let grupaSClanovima = {
                grupa: grupa,
                clanovi : clanoviDTO
            } */

            let animatoriDTO = [];
            for(let i = 0; i < animatori.length; i++) {
                let clan = {
                    korisnicko_ime : animatori[i].korisnicko_ime,
                    ime: animatori[i].ime,
                    prezime : animatori[i].prezime,
                    email : animator[i].email,
                    br_tel : animator[i].br_tel
                }

                animatoriDTO.push(clan);
            }

            return JSON.stringify({
                grupa : grupa,
                clanovi : clanoviDTO,
                animatori : animatoriDTO
            });


        } else if(korisnik.statusKorisnik == "animator") {
            let grupe = await Grupa.fetchAllGrupa();
        
            //let grupeSClanovima = [];
            let clanoviDTO =[];
            for(let i = 0; i < grupe.length; i++){
                //let clanoviDTO =[];

                let clanovi = await grupe[i].fetchAllMembers();
                
                for(let j = 0; j < clanovi.length; j++) {
                    let clan = {
                        korisnicko_ime : clanovi[j].korisnicko_ime,
                        ime: clanovi[j].ime,
                        prezime : clanovi[j].prezime,
                        email : clanovi[i].email,
                        br_tel: clanovi[i].br_tel,
                        id_grupa : grupe[i].id_grupa
                    }

                    clanoviDTO.push(clan);
                }

/*                 let grupaSClanovima = {
                    grupa: grupe[i],
                    clanovi : clanoviDTO
                }
                grupeSClanovima.push(grupaSClanovima); */
            }

            

            let animatori = await Animator.fetchAllAnimator();

            let animatoriDTO = [];
            for(let i = 0; i < animatori.length; i++) {
                let animator = {
                    korisnicko_ime : animatori[i].korisnicko_ime,
                    ime: animatori[i].ime,
                    prezime : animatori[i].prezime,
                    email : animatori[i].email,
                    br_tel: animatori[i].br_tel
                }

                animatoriDTO.push(animator);
            }
            

            return JSON.stringify({
                grupe : grupe,
                clanovi : clanoviDTO,
                animatori : animatoriDTO
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