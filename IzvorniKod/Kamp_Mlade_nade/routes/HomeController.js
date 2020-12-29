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

            //console.log(req.cookies.korisnik);

            if(req.body.statusKorisnik == undefined){
                let kamp = await Kamp.fetchUpcoming();
                let aktivnosti = await Aktivnost.fetchAllAktivnost(kamp);
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                let timer = new Date(kamp.datum_odrzavanja_kamp).toLocaleDateString(undefined, options); // za sad podržavamo jedan aktivni kamp
                
                return JSON.stringify({
                    kamp : kamp.ime_kamp,
                    pocetak_kamp : timer,
                    pocetak_prijava_sud: kamp.pocetak_prijava_sudionika,
                    kraj_prijava_sud : kamp.kraj_prijava_sudionika,
                    pocetak_prijava_anim : kamp.pocetak_prijava_animatora,
                    kraj_prijava_anim : kamp.kraj_prijava_animatora,
                    aktivnosti : aktivnosti
                });
            } else if(req.body.statusKorisnik == "sudionik" || req.body.statusKorisnik == "animator"){
                let kamp = await Kamp.fetchActive();
                if(kamp.status != undefined){
                    return JSON.stringify({
                        kamp : kamp.ime_kamp,
                        email: kamp.email_kamp
                    });
                } else {
                    let kamp = await Kamp.fetchUpcoming();
                    let timer = new Date(kamp.datum_odrzavanja_kamp).toDateString(); // za sad podržavamo jedan aktivni kamp
                    
                    return JSON.stringify({
                        kamp : kamp.ime_kamp,
                        pocetak_kamp : timer,
                        email: kamp.email_kamp
                    });
                } 
            }
            
            //let korisnik = JSON.parse(req.cookies.korisnik);

            //if()
            // ako korisnik nije prijavljen šalji info o sljedećem kampu



 /*            let kamp = await Kamp.fetchActive();
            if(kamp.status != undefined){
                let aktivnosti = await Aktivnost.fetchAllAktivnost(kamp);
                return JSON.stringify({
                    kamp : kamp.ime_kamp,
                    email: kamp.email_kamp,
                    aktivnosti : aktivnosti
                });
        } else {
            let kamp = await Kamp.fetchUpcoming();
            let aktivnosti = await Aktivnost.fetchAllAktivnost(kamp);
            let timer = new Date(kamp.datum_odrzavanja_kamp); // za sad podržavamo jedan aktivni kamp
            
            return JSON.stringify({
                kamp : kamp.ime_kamp,
                pocetak_prijava_sud: kamp.pocetak_prijava_sudionika,
                kraj_prijava_sud : kamp.kraj_prijava_sudionika,
                pocetak_prijava_anim : kamp.pocetak_prijava_animatora,
                kraj_prijava_anim : kamp.kraj_prijava_animatora,
                pocetak_kamp : timer.toString(),
                aktivnosti : aktivnosti
            });
        } */
        
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
