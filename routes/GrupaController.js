const express = require('express');
const router = express.Router();
const Controller = require('./Controller');
const Grupa = require('../models/Grupa');
const Sudionik = require('../models/Sudionik');
const Raspored = require('../models/Raspored');

class GrupaController extends Controller {
    constructor(){
        super();
    }

    async get(req, res, next) {
        try {
            let grupe = await Grupa.fetchAllGrupa();
           
            if(grupe.length > 0) {

                let clanoviDTO =[];
                for(let i = 0; i < grupe.length; i++){
                    let clanovi = await grupe[i].fetchAllMembers();
                    
                    for(let j = 0; j < clanovi.length; j++) {
                        let clan = {
                            korisnicko_ime : clanovi[j].korisnicko_ime,
                            ime: clanovi[j].ime,
                            prezime : clanovi[j].prezime,
                            email : clanovi[j].email,
                            br_tel: clanovi[j].br_tel,
                            id_grupa : grupe[i].id_grupa
                        }
    
                        clanoviDTO.push(clan);
                    }
    
                }

                return JSON.stringify({
                    grupe: grupe,
                    clanovi : clanoviDTO
                });

            } else {
                let sudionici = await Sudionik.fetchNSudionikWithoutGroup('ALL');

                return JSON.stringify({
                    brojSudionika : sudionici.length
                });
            }

        } catch (error) {
            return JSON.stringify({error: "Greška pri dohvatu grupa kampa!"});
        }
      
    }

    async post(req, res, next) {
        let brojGrupa = req.body.brojGrupa;
    
        try {
            await Grupa.createGroups(brojGrupa);
            //await Raspored.setDefaultActivities();
            
            return JSON.stringify({
                poruka : `Uspješno stvoreno ${brojGrupa} grupa!`
            });
            
        } catch (error) {
            return JSON.stringify({error: "Greška pri stvaranju grupa"});
        }
      
    }

    async zamjeniClanove(req, res, next) {
        let zamjena = req.body;
    
        try {
            await Sudionik.changeSudionikGroup(zamjena.swap1, zamjena.id_grupa1)
            await Sudionik.changeSudionikGroup(zamjena.swap2, zamjena.id_grupa2)
            
            return JSON.stringify({
                poruka : `Uspješna zamjena grupa!`
            });
            
        } catch (error) {
            return JSON.stringify({error: "Greška pri stvaranju grupa"});
        }
      
    }
}

let grupaController = new GrupaController();

router.get("/", async (req, res, next) => {
    let data = JSON.parse( await grupaController.get(req, res, next));
    if(data.error != null){
        res.status(400).json(data);
    } else {
        res.json(data);
    }
});

router.post("/", async (req, res, next) => {
    let data = JSON.parse( await grupaController.post(req, res, next));
    if(data.error != null){
        res.status(400).json(data);
    } else {
        res.json(data);
    }
});

router.post("/promjeni", async (req, res, next) => {
    let data = JSON.parse( await grupaController.zamjeniClanove(req, res, next));
    if(data.error != null){
        res.status(400).json(data);
    } else {
        res.json(data);
    }
});

module.exports = router;