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
            let aktivniKamp = await Kamp.checkForActiveCamp();
            if(aktivniKamp.status != undefined && aktivniKamp.status != 1){
                await aktivniKamp.updateStatusKamp(1);
            }

            if(req.body.statusKorisnik == undefined){
                let kamp = await Kamp.fetchUpcoming();
                let aktivnosti = await Aktivnost.fetchAllAktivnost(kamp);
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                let timer = new Date(kamp.datum_odrzavanja_kamp).toLocaleDateString(undefined, options); // za sad podržavamo jedan aktivni kamp
                
                const prijaveZaSudionike = await kamp.checkForSudionikPrijave();
                const prijaveZaAnimatore = await kamp.checkForAnimatorPrijave();

                return JSON.stringify({
                    status_kamp : 0,
                    kamp : kamp.ime_kamp,
                    email: kamp.email_kamp,
                    pocetak_kamp : timer,
                    trajanje_kamp : kamp.trajanje,
                    email: kamp.email_kamp,
                    pocetak_prijava_sud: new Date(kamp.pocetak_prijava_sudionika).toLocaleDateString(undefined, options),
                    kraj_prijava_sud : new Date(kamp.kraj_prijava_sudionika).toLocaleDateString(undefined, options),
                    prijave_sud_otvorene : prijaveZaSudionike,
                    pocetak_prijava_anim : new Date(kamp.pocetak_prijava_animatora).toLocaleDateString(undefined, options),
                    kraj_prijava_anim : new Date(kamp.kraj_prijava_animatora).toLocaleDateString(undefined, options),
                    prijave_anim_otvorene: prijaveZaAnimatore,
                    aktivnosti : aktivnosti
                });
            } else if(req.body.statusKorisnik == "sudionik" || req.body.statusKorisnik == "animator"
                        || req.body.statusKorisnik == "organizator"){
                let kamp = await Kamp.fetchActive();
                if(kamp.status != undefined){
                    return JSON.stringify({
                        status_kamp : 1,
                        kamp : kamp.ime_kamp,
                        email: kamp.email_kamp
                    });
                } else {
                    let kamp = await Kamp.fetchUpcoming();
                    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                    let timer = new Date(kamp.datum_odrzavanja_kamp).toLocaleDateString(undefined, options);
                    
                    return JSON.stringify({
                        status_kamp : 0,
                        kamp : kamp.ime_kamp,
                        pocetak_kamp : timer,
                        email: kamp.email_kamp
                    });
                } 
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
