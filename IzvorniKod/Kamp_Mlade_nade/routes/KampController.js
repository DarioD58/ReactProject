const express = require('express');
const Aktivnost = require('../models/Aktivnost');
const router = express.Router();
const Kamp = require('../models/Kamp');
const Ukupni_dojam = require('../models/Ukupni_dojam');
const Controller = require('./Controller');


class KampController extends Controller {
    constructor(){
        super();
    }

    async createKamp(req, res, next) {
        let ime_kamp = req.body.ime_kamp;
        let datum_odrzavanja_kamp = req.body.datum_odrzavanja;
        let trajanje = req.body.trajanje;
        let pocetak_prijava_sudionika = req.body.pocetak_prijava_sud;
        let kraj_prijava_sudionika = req.body.kraj_prijava_sud;
        let pocetak_prijava_animatora = req.body.pocetak_prijava_anim;
        let kraj_prijava_animatora = req.body.kraj_prijava_anim;
        let broj_grupa = 0;
        let status = 0;
        let email_kamp = req.body.email;
        try{   
            let kamp = new Kamp(ime_kamp, datum_odrzavanja_kamp, trajanje, pocetak_prijava_sudionika,
                kraj_prijava_sudionika, pocetak_prijava_animatora, kraj_prijava_animatora, broj_grupa, status, email_kamp);
            let stvoreni_ime = await kamp.createKamp();

            let dorucak = new Aktivnost("Doručak", "Zajednički doručak",
                1, "svi", datum_odrzavanja_kamp, ime_kamp);
            dorucak.addNewAktivnost();

            let rucak = new Aktivnost("Ručak", "Zajednički ručak",
                1, "svi", datum_odrzavanja_kamp, ime_kamp);
            rucak.addNewAktivnost();

            let vecera = new Aktivnost("Večera", "Zajednička večera",
                1, "svi", datum_odrzavanja_kamp, ime_kamp);
            vecera.addNewAktivnost();

            return JSON.stringify({
            poruka : `Uspješno stvoren novi kamp ${stvoreni_ime}!`
            });
            
        } catch (err) {
            console.error(err);
            return JSON.stringify({error : "Greška pri stvaranju kampa."});   
        }
    }

    
    async campGrade(req, res, next) {
        let korisnik = req.cookies.korisnik;
        
        try {
            let ukupni_dojam = new Ukupni_dojam(req.body.ocjena, req.body.dojam, korisnik.korisnickoIme,
                                    req.body.datum_odrzavanja_kamp, req.body.ime_kamp);
            await ukupni_dojam.addNewUkupniDojam();
            return JSON.stringify({poruka : "Ocjena i dojam kampa uspješno uneseni!"});
        } catch (error) {
            return JSON.stringify({error: "Greška pri unosu ocjene aktivnosti!"});
        }
      
    }

}

let kampController = new KampController();

router.post("/create", async (req, res, next) => {
    let data = JSON.parse(await kampController.createKamp(req, res, next));
    if(data.error != null){
        res.status(404).json(data);
    } else{
        res.json(data);
    }
});

// za unos ocjene aktivnosti korisnika
router.post("/ocjena", async (req, res, next) => {
    let data = JSON.parse( await kampController.campGrade(req, res, next));
    if(data.error != null){
        res.status(400).json(data);
    } else {
        res.json(data);
    }
});

module.exports = router;
