const { response } = require('express');
const express = require('express');
const Aktivnost = require('../models/Aktivnost');
const router = express.Router();
const Kamp = require('../models/Kamp');
const Controller = require('./Controller');

class HomeController extends Controller {
    constructor(){
        super();
    }

    async get(req, res, next) {
        try{
            let kamp = await Kamp.fetchActive();
            if(kamp.ime_kamp != null){
                let aktivnosti = await Aktivnost.fetchAll(kamp.ime_kamp, kamp.datum_odrzavanja_kamp);
                return JSON.stringify({
                    kamp : kamp.ime_kamp,
                    aktivnosti : aktivnosti
                });
            } else {
                let kamp = await Kamp.fetchUpcoming();
                let aktivnosti = await Aktivnost.fetchAll(kamp.ime_kamp, kamp.datum_odrzavanja_kamp);
                let timer = new Date(kamp.datum_odrzavanja); // za sad podržavamo jedan aktivni kamp
               
                return JSON.stringify({
                    nadolazeci_kamp : kamp.ime_kamp,
                    pocetak_kamp : timer.toString(),
                    aktivnosti : aktivnosti
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
    if(data.error != null){
        res.status(404).json(data);
    } else{
        res.json(data);
    }
});

module.exports = router;
