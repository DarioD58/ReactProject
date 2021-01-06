const express = require('express');
const Aktivnost = require('../models/Aktivnost');
const router = express.Router();
const Kamp = require('../models/Kamp');
const Controller = require('./Controller');
const Ocjena_aktivnost = require('../models/Ocjena_aktivnost');
const Grupa = require('../models/Grupa');
const Animator = require('../models/Animator');
const Raspored = require('../models/Raspored');

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
            let aktivnost_check = await Aktivnost.fetchAktivnostByName(ime_aktivnost, kamp.ime_kamp,  kamp.datum_odrzavanja_kamp)
            if(aktivnost_check !== undefined)
                throw new Error(`Aktivnost ${ime_aktivnost} već postoji`)
            try{   
                let aktivnost = new Aktivnost(ime_aktivnost, opis_aktivnost,
                    trajanje_aktivnost_h, tip_aktivnost, kamp.datum_odrzavanja_kamp, kamp.ime_kamp);
                let id_akt = await aktivnost.addNewAktivnost();
                
                return JSON.stringify({
                poruka : `Uspješno stvorena nova aktivnost ${ime_aktivnost}!`
                });
                
            } catch (err) {
                console.error(err);
                return JSON.stringify({error : "Greška pri stvaranju aktivnosti."});   
            }
        } catch(err){
            return JSON.stringify({error : err.message});
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

    async getAddToRaspored(req, res, next) {
        try {
            let grupe = await Grupa.fetchAllGrupa();        

            let animatori = await Animator.fetchAllAnimator();

            let animatoriDTO = [];
            for(let i = 0; i < animatori.length; i++) {
                let animator = {
                    korisnicko_ime : animatori[i].korisnicko_ime,
                    ime: animatori[i].ime,
                    prezime : animatori[i].prezime
                }

                animatoriDTO.push(animator);
            }
            
            return JSON.stringify({
                grupe : grupe,
                animatori : animatoriDTO
            });
        } catch(error){
            return JSON.stringify({error: "Greška pri dohvatu grupa i aktivnosti!"});
        }
      
    }

    async postAddToRaspored(req, res, next) {
        let infoAktivnost = req.body;


        let instancaAktivnosti = new Raspored(infoAktivnost.id_grupa, infoAktivnost.id_aktivnost, 
            infoAktivnost.datum_i_vrijeme, infoAktivnost.korisnicko_ime_animator);
        try {
            await Raspored.setDefaultActivities();

        } catch(error){
            return JSON.stringify({error: "Greška pri stvaranju rasporeda!"});
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

router.get("/add", async (req, res, next) => {
    console.log('Tu sam')
    let data = JSON.parse( await aktivnostController.getAddToRaspored(req, res, next));
    if(data.error != null){
        res.status(400).json(data);
    } else {
        res.json(data);
    }
});

router.post("/add", async (req, res, next) => {
    let data = JSON.parse( await aktivnostController.postAddToRaspored(req, res, next));
    if(data.error != null){
        res.status(400).json(data);
    } else {
        res.json(data);
    }
});




module.exports = router;
