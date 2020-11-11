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
        
        body('email').isEmail();



        if(req.body.status == "sudionik"){
            let sudionik = new Sudionik(korisnicko_ime, null, req.body.email, req.body.ime, req.body.prezime, req.body.status,
                req.body.br_tel, req.body.DOB, req.body.br_tel_odg_osobe != null ? req.body.br_tel_odg_osobe : null);
            
            sudionik.addNewSudionik();
            
        } else if(req.body.status = "animator"){
            let animator = new Animator(korisnicko_ime, null, req.body.email, req.body.ime, req.body.prezime, req.body.status,
                req.body.br_tel, req.body.DOB);

            animator.addNewAnimator();
            
         
        } 

        let korisnik = await Korisnik.fetchKorisnikByUsername(korisnicko_ime);
        let kamp = await Kamp.fetchUpcoming();
        /* POGLEDAJ POSTOJI LI PRIJAVA ZA ISTO KORISNICKO IME
        let prijava = new Prijava(korisnik, req.body.pismo, "neobrađena", kamp);
        */
        let id = prijava.addNewPrijava();
        
        return JSON.stringify({nova_prijava : id, korisnik : req.body.status});
    }

    replaceLocalChars(korIme){
        return korIme.replace(/ć|č/gi, "c").replace(/đ/gi, "d").replace(/š/gi, "s").replace(/ž/gi, "z");
    }

}
apply = new ApplyController();

router.post("/", async (req, res, next) => {
    let data = JSON.parse(await apply.post(req, res, next));
    res.json(data);
});

module.exports = router;