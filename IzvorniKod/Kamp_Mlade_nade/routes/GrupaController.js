const express = require('express');
const router = express.Router();
const Controller = require('./Controller');
const Grupa = require('../models/Grupa');
const Sudionik = require('../models/Sudionik');

class GrupaController extends Controller {
    constructor(){
        super();
    }

    async get(req, res, next) {
        try {
            let grupe = await Grupa.fetchAllGrupa();
            if(grupe.lenght != 0) {

                let grupeSClanovima = [];

                for(let i = 0; i < grupe.lenght; i++){
                    let clanovi = await grupe[i].getAllMembers();
                    let grupaSClanovima = {
                        grupa: grupe[i],
                        clanovi : clanovi
                    }
                    grupeSClanovima.push(grupaSClanovima);
                }

                return JSON.stringify({
                    grupeSClanovima : grupeSClanovima
                });

            } else {
                let sudionici = await Sudionik.fetchAllSudionik();
                return JSON.stringify({
                    brojSudionika : sudionici.lenght
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

            return JSON.stringify({
                poruka : `Uspješno stvoreno ${brojGrupa} grupa!`
            });
            
        } catch (error) {
            return JSON.stringify({error: "Greška pri stvaranju grupa"});
        }
      
    }
}

let grupa = new GrupaController();

router.get("/", async (req, res, next) => {
    let data = JSON.parse( await grupa.get(req, res, next));
    if(data.error != null){
        res.status(400).json(data);
    } else {
        res.json(data);
    }
});

router.post("/", async (req, res, next) => {
    let data = JSON.parse( await grupa.post(req, res, next));
    if(data.error != null){
        res.status(400).json(data);
    } else {
        res.json(data);
    }
});

module.exports = router;