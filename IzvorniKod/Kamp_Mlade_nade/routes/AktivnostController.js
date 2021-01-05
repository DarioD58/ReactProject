const express = require('express');
const Aktivnost = require('../models/Aktivnost');
const router = express.Router();
const Kamp = require('../models/Kamp');
const Controller = require('./Controller');
const Ocjena_aktivnost = require('../models/Ocjena_aktivnost');
class AktivnostController extends Controller {
    constructor(){
        super();
    }

    async createAktivnost(req, res, next) {
        let ime_aktivnost = req.body.ime;
        let opis_aktivnost = req.body.opis;
        let tip_aktivnost = req.body.tip;
        let trajanje_aktivnost_h = req.body.trajanje;
        let kamp = await Kamp.fetchUpcoming();

        try{   
            let aktivnost = new Aktivnost(ime_aktivnost, opis_aktivnost,
                trajanje_aktivnost_h, tip_aktivnost, kamp.datum_odrzavanja_kamp, kamp.ime_kamp);
            let id_akt = await aktivnost.addNewAktivnost();
            
            return JSON.stringify({
            poruka : `Uspješno stvorena nova aktivnost ${id_akt}!`
            });
            
        } catch (err) {
            console.error(err);
            return JSON.stringify({error : "Greška pri stvaranju aktivnosti."});   
        }
    }

    async activityGrade(req, res, next) {
        let korisnik = req.cookies.korisnik;
        
        try {
            let ocjena_aktivnost = new Ocjena_aktivnost(req.body.ocjena, req.body.dojam, req.body.id_aktivnost, korisnik.korisnickoIme);
            await ocjena_aktivnost.addNewOcjenaAktivnost();
            return JSON.stringify({poruka : "Ocjena i dojam aktivnosti uspješno uneseni!"});
        } catch (error) {
            return JSON.stringify({error: "Greška pri unosu ocjene aktivnosti!"});
        }
      
    }

}

let aktivnostController = new AktivnostController();

router.post("/create", async (req, res, next) => {
    let data = JSON.parse(await aktivnostController.createAktivnost(req, res, next));
    if(data.error != null){
        res.status(404).json(data);
    } else{
        res.json(data);
    }
});

// za unos ocjene aktivnosti korisnika
router.post("/ocjena", async (req, res, next) => {
    let data = JSON.parse( await aktivnostController.activityGrade(req, res, next));
    if(data.error != null){
        res.status(400).json(data);
    } else {
        res.json(data);
    }
});




module.exports = router;
