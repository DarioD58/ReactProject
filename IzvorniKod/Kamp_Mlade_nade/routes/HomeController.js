const { response } = require('express');
const express = require('express');
const router = express.Router();
const Kamp = require('../models/Kamp');
const Controller = require('./Controller');

class HomeController extends Controller {
    constructor(){
        super();
    }

    async get(req, res, next) {
        try{
            let camp = await Kamp.fetchActive();
            if(camp.ime_kamp != null){
                return JSON.stringify({kamp : camp.ime_kamp});
            } else {
                let camp = await Kamp.fetchUpcoming();
                let timer = new Date(camp.datum_odrzavanja); // za sad podržavamo jedan aktivni kamp
                return JSON.stringify({
                    nadolazeci_kamp : camp.ime_kamp,
                    pocetak_kamp : timer.toString()
                });
            }
        
        } catch (err) {
            console.error(err);
            return JSON.stringify({error : "Nema aktivnih ili nadolazećih kampova."});   
        }
    }

}

let home = new HomeController();
router.get("/", async (req, res, next) => {
    let data = JSON.parse(await home.get(req, res, next));
    res.json(data);
});

module.exports = router;
