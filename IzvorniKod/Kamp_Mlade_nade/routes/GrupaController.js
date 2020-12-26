const express = require('express');
const router = express.Router();
const Controller = require('./Controller');
const Grupa = require('../models/Grupa');

class GrupaController extends Controller {
    constructor(){
        super();
    }

    async get(req, res, next) {
        try {
            let grupe = Grupa.fetchAllGrupa();
            if(grupe.lenght != 0) {

                let grupeSClanovima = [];

                for(let i = 0; i < grupe.lenght; i++){
                    let clanovi = grupe[i].getAllMembers();
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
                
            }
        } catch (error) {
            return JSON.stringify({error: "Grupe za kamp ne postoje"});
        }
      
    }

    async post(req, res, next) {
        try {

            }
        } catch (error) {
            return JSON.stringify({error: "Grupe za kamp ne postoje"});
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