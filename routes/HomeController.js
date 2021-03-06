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
            if(aktivniKamp != undefined && aktivniKamp.status != 1){
                await aktivniKamp.updateStatusKamp(1);
            }

            let prosliKamp = await Kamp.checkForPastActiveCamp();
            if(prosliKamp != undefined && prosliKamp.status == 1){
                await prosliKamp.updateStatusKamp(0);
            }

            let korisnik;
            if(req.cookies.korisnik != undefined){
                korisnik = JSON.parse(req.cookies.korisnik);
            }


            if(korisnik == undefined){
                let kamp = await Kamp.fetchUpcoming();
                let aktivnosti = await Aktivnost.fetchAllAktivnost(kamp);
                let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
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
                
            } else if(korisnik.statusKorisnik == "sudionik" || korisnik.statusKorisnik == "animator"
                        || korisnik.statusKorisnik == "organizator"){
                    let kamp = await Kamp.fetchCompleted();
                    if(kamp != undefined && kamp.status == 0) {
                        let aktivnosti = await Aktivnost.fetchAllAktivnost(kamp);
                        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                        let timer = new Date(kamp.datum_odrzavanja_kamp).toLocaleDateString(undefined, options);
    
                        return JSON.stringify({
                            status_kamp : kamp.status,
                            kamp : kamp.ime_kamp,
                            email : kamp.email_kamp,
                            aktivnosti : aktivnosti,
                            pocetak_kamp : timer 
                        });
                    }
    
                    kamp = await Kamp.fetchActive();
                    if(kamp != undefined && kamp.status == 1) {
                        let aktivnosti = await Aktivnost.fetchAllAktivnost(kamp);
                        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                        let timer = new Date(kamp.datum_odrzavanja_kamp).toLocaleDateString(undefined, options);
    
                        return JSON.stringify({
                            status_kamp : kamp.status,
                            kamp : kamp.ime_kamp,
                            email : kamp.email_kamp,
                            aktivnosti : aktivnosti,
                            pocetak_kamp : timer  
                        });
                    }
    
                    kamp = await Kamp.fetchUpcoming();
                    if(kamp != undefined && kamp.status == 0) {
                        let aktivnosti = await Aktivnost.fetchAllAktivnost(kamp);
                        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
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
                    } 
                
            }
        
        } catch (err) {
            console.error(err);
            return JSON.stringify({error : "Nema aktivnih ili nadolazećih kampova."});   
        }
    }

}

let homeController = new HomeController();

router.get("/", async (req, res, next) => {
    let data = JSON.parse(await homeController.get(req, res, next));
    if(data.error != null){
        res.status(404).json(data);
    } else{
        res.json(data);
    }
});

module.exports = router;
