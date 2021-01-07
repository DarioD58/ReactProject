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
        let br_grupa = req.body.br_grupa;
        let trajanje_aktivnost_h = req.body.trajanje;
        let kamp = await Kamp.fetchUpcoming();

        if(tip_aktivnost == 'max N'){
            tip_aktivnost = 'max ' + br_grupa;
        } else if(tip_aktivnost == 'N'){
            tip_aktivnost = br_grupa;
        } 

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
                console.log(err);
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
        let ime_aktivnost = req.body.ime;
        let datum_i_vrijeme = req.body.datum;
        let grupe = req.body.grupe;
        let animatori = req.body.animatori;
        console.log(req.body);
        
        try {
        let kamp = await Kamp.fetchUpcoming();
        let aktivnost = await Aktivnost.fetchAktivnostByName(ime_aktivnost, kamp.ime_kamp, kamp.datum_odrzavanja_kamp);
        let full_grupe = await Grupa.fetchAllGrupa()

        // uvjet 1) aktivnost se neće preklapati s aktivnošću istog tipa
        let typeOverlap = await Raspored.checkActivityTypeOverlap(kamp.datum_odrzavanja_kamp, aktivnost.tip_aktivnost);
        if(typeOverlap > 0) throw new Error("Aktivnost se ne smije preklapati s aktivnošću istog tipa!");

        // uvjet 2) pridružen je minimalno jedan animator
        if(animatori.length < 1) throw new Error("Aktivnost mora imati barem jednog animatora!");
        
        // uvjet 3) pridružen je odgovarajuć broj grupa
        /*if(aktivnost.tip_aktivnost.includes("max")){
            let maxBroj = aktivnost.tip_aktivnost.split(" ")[1];
            if(grupe.length > maxBroj) throw new Error(`Aktivnosti je pridruženo previše grupa. Smije biti najviše ${maxBroj} grupa.`);
        } else {
            let brojGrupa = aktivnost.tip_aktivnost.split(" ")[1];
            if(grupe.length != maxBroj) throw new Error(`Aktivnosti je pridružen nevaljan grupa. Na aktivnosti mora biti ${brojGrupa} grupa.`);
        }*/

        // uvjet 4) ni jedna od pridruženih grupa neće imati konflikte s drugim aktivnostima koje su već navedene
        let timeOverlap = await Raspored.checkActivityTimeOverlap(datum_i_vrijeme, aktivnost.trajanje_aktivnost_h);
        if(timeOverlap > 0) throw new Error("Aktivnost se ne smije imati vremenske konflikte s postojećim aktivnostima!");

        // uvjet 5) ni jedna od pridruženih grupa nije već pridružena jednakoj aktivnosti
        for(let i = 0; i < grupe.length; i++){
            let grupaOverlap = await Raspored.checkGrupaOverlap(grupe[i].id_grupa);
            if(grupaOverlap > 0) throw new Error(`Grupa ${grupe[i]} je već pridružena aktivnosti ${ime_aktivnost}.`);
        }

        // uvjet 6) pridruženi animatori neće imati konflikte s drugim aktivnostima na koje su pridruženi
        for(let i = 0; i < animatori.length; i++){
            let animatorOverlap = await Raspored.checkAnimatorOverlap(animatori[i].korisnicko_ime, datum_i_vrijeme);
            if(animatorOverlap > 0) throw new Error(`Animator ${animatori[i]} je već pridružen aktivnosti ${ime_aktivnost}.`);
        }

        for(let i = 0; i < grupe.length; i++){
            for(let j = 0; j < animatori.length; j++){
                let instancaAktivnosti = new Raspored(grupe[i], aktivnost.id_aktivnost, 
                    datum_i_vrijeme, animatori[j]);
                instancaAktivnosti.addToRaspored();
            }
        }
        return JSON.stringify({poruka: `Aktivnost ${aktivnost.ime_aktivnost} je uspješno dodana u raspored!`});
        } catch(error){
            return JSON.stringify({error: "Greška pri dodavanju aktivnosti u raspored! " + error.message});
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
