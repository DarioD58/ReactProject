const { request } = require('express');
const express = require('express');
const { body, validationResult } = require('express-validator');
const Sudionik = require('../models/Sudionik');
const Korisnik = require('../models/Korisnik');
const router = express.Router();
const Controller = require('./Controller');
const Kamp = require('../models/Kamp');
const Animator = require('../models/Animator');
const Prijava = require('../models/Prijava');

class ApplyController extends Controller {
    constructor(){
        super();
    }

    async post (req, res, next){
       

        let korisnicko_ime = req.body.ime.toLowerCase().substring(0, 1) + req.body.prezime.toLowerCase();
        korisnicko_ime = this.replaceLocalChars(korisnicko_ime);
        
        try {
            if(req.body.status == "sudionik"){
                let postojeciSudionik = await Sudionik.fetchSudionikByUsername(korisnicko_ime);
                
                if(postojeciSudionik.korisnicko_ime != null) return JSON.stringify({error : "Prijava nije moguća za postojećeg sudionika."});
                
                let sudionik = new Sudionik(korisnicko_ime, null, req.body.email, req.body.ime, req.body.prezime, req.body.status,
                    req.body.br_tel, req.body.DOB, req.body.br_tel_odg_osobe != null ? req.body.br_tel_odg_osobe : null);
                
                sudionik.addNewSudionik();
                
            } else if(req.body.status = "animator"){
                let postojeciAnimator = await Animator.fetchAnimatorByUsername(korisnicko_ime);
                
                if(postojeciAnimator.korisnicko_ime != null) return JSON.stringify({error : "Prijava nije moguća za postojećeg animatora."});
                
                let animator = new Animator(korisnicko_ime, null, req.body.email, req.body.ime, req.body.prezime, req.body.status,
                    req.body.br_tel, req.body.DOB);
    
                animator.addNewAnimator();
            } 

            
            // provjera postoji li prijava za ovog korisnika
            let id_prijava = await Prijava.checkPrijavaForUsername(korisnicko_ime);
            
            if(id_prijava == null || id_prijava == undefined) return JSON.stringify({error : "Za ovu osobu već postoji neobrađena prijava"});
        
            let korisnik = await Korisnik.fetchKorisnikByUsername(korisnicko_ime);
            let kamp = await Kamp.fetchUpcoming();
            let prijava = new Prijava(korisnik, req.body.pismo, "neobrađena", kamp);
            console.log(prijava);
            
            let id = await prijava.addNewPrijava();
            
            return JSON.stringify({nova_prijava : id, korisnik : req.body.status});
        
        } catch (err) {
            return JSON.stringify({error : "Greška kod prijave."});
        }
    }

    replaceLocalChars(korIme){
        return korIme.replace(/ć|č/gi, "c").replace(/đ/gi, "d").replace(/š/gi, "s").replace(/ž/gi, "z");
    }

}
apply = new ApplyController();

router.post("/", [body('email').isEmail()], async (req, res, next) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()) res.json({errors : errors.array() });

    let data = JSON.parse(await apply.post(req, res, next));
    
    if(data.error != null){
        res.status(409).json(data);
    } else {
        res.json(data);
    }
   
});

module.exports = router;