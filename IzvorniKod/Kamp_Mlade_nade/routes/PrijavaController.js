const express = require('express');
const router = express.Router();
const Controller = require('./Controller');
const cookie = require('cookie');
const Organizator = require('../models/Organizator');
const Prijava = require('../models/Prijava');
const nodemailer = require("nodemailer");
const Korisnik = require('../models/Korisnik');
const Sudionik = require('../models/Sudionik');
const Animator = require('../models/Animator');

class PrijavaController extends Controller {
    constructor(){
        super();
    }

    async activeApplications(req, res, next){
        let korisnik = req.cookies.korisnik;

        try {
            if(korisnik.statusKorisnik === 'organizator') throw new Error();

            let prijave = await Prijava.fetchActivePrijava();
            return JSON.stringify({
                prijave : prijave
            });
            
        } catch (err) {
            console.error(err);
            return JSON.stringify({error : "Korisnik nije organizator. Pristup odbijen."});
        }

    }
    
    // Pomocna metoda za stvaranje korisnickog imena
    // vraca String
    replaceLocalChars(korIme){
        return korIme.replace(/ć|č/gi, "c").replace(/đ/gi, "d").replace(/š/gi, "s").replace(/ž/gi, "z");
    }

    async processApplication(req, res, next){
        let id = req.body.id_prijava;
        let status_prijava = req.body.status;
        let prijava = await Prijava.fetchPrijava(id);
   
        let korisnicko_ime = prijava.ime.toLowerCase().substring(0, 1) + prijava.prezime.toLowerCase();
        korisnicko_ime = this.replaceLocalChars(korisnicko_ime);
        
        if(status_prijava == "prihvaćena"){
            if(prijava.status_korisnik == "sudionik") {
                let sudionik = new Sudionik(korisnicko_ime, null, prijava.ime, prijava.prezime, prijava.datum_i_god_rod,
                    prijava.email, prijava.br_tel, prijava.status_korisnik, prijava.br_tel_odg_osobe);
                
                sudionik.addNewSudionik();
            } else if(prijava.status_korisnik == "animator"){
                let animator = new Animator(korisnicko_ime, null, prijava.ime, prijava.prezime, prijava.datum_i_god_rod,
                    prijava.email, prijava.br_tel, prijava.status_korisnik);

                animator.addNewAnimator();
            } else {
                throw new Error("Neispravan status korisnika.");
            }
        }

        let kamp = await Korisnik.fetchKorisnikByUsername('KampMladenade');
        await prijava.changeStatusPrijava(status_prijava);

        // create reusable transporter object using the default SMTP transport
/*         let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: sender, // generated ethereal user
                pass: senderPas, // generated ethereal password
            },
        }); */

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: kamp.email,
              pass: kamp.lozinka
            }
          });

        let msg = {
            from: '"Kamp Mlade nade" <mladenade.kamp@gmail.com>', // sender address
            to: `${prijava.ime} ${prijava.prezime} ${prijava.email}`, // list of receivers
            //to: email,
            subject: "Kamp Mlade nade - prijava", // Subject line
            text: "", // plain text body
        } 

        try {
            if(status_prijava == "prihvaćena"){
                msg.text = `Pozdrav ${prijava.ime},\n
                Vaša prijava je ${status_prijava}!
                Vaše korisničko ime je ${korisnicko_ime}. 
                Dovršite Vašu registraciju na poveznici.\n
                Vaš Kamp Mlade nade \n
                http://${req.hostname}:3000/register`;
                await transporter.sendMail(msg);
                
            } else if(status_prijava == "odbijena"){
                msg.text = `Pozdrav ${prijava.ime}, \n 
                Vaša prijava je nažalost ${status_prijava}. 
                Pokušajte se prijaviti na sljedeći kamp. \n
                Vaš Kamp Mlade nade`;
                await transporter.sendMail(msg);
            } else {
                throw new Error("Neispravan status prijave.");
            }

            
        } catch (error) {
            return JSON.stringify({error : "Greška kod obrade prijave. " + error.message});
        }


        return JSON.stringify({
            korisnickoIme : korisnicko_ime,
            status_prijava : status_prijava
        });
    }
}

let prijavaController = new PrijavaController();

router.get("/", async (req, res, next) => {
    let data = JSON.parse( await prijavaController.activeApplications(req, res, next));
    if(data.error != null){
        res.status(400).json(data);
    } else {
        res.json(data);
    }
});

router.post("/", async (req, res, next) => {
    let data = JSON.parse( await prijavaController.processApplication(req, res, next));
    //console.log(data);
    if(data.error != null){
        res.status(400).json(data);
    } else {
        res.json(data);
    }
});

module.exports = router;