const express = require('express');
const router = express.Router();
const Controller = require('./Controller');
const cookie = require('cookie');
const Organizator = require('../models/Organizator');
const Prijava = require('../models/Prijava');
const nodemailer = require("nodemailer");
const Korisnik = require('../models/Korisnik');

class PrijavaController extends Controller {
    constructor(){
        super();
    }

    async activeApplications(req, res, next){
        //let cookies = cookie.parse(req.headers.cookie || '');
    /*     let cookies = JSON.parse(req.cookies);
        console.log(cookies); */
        let korisnik = req.cookies.korisnik;

        try {
            if(korisnik.statusKorisnik === 'organizator') throw new Error();
            // testno
            let prijave = []
            let prijava = new Prijava("Dario", "Deković", "Party kamp", "sudionik", "Najbolji kamp")
            prijave.push(prijava)
            prijava = new Prijava("Toni", "Dujmović", "Zgodne kamperice", "animator", "Najbolji kamp")
            prijave.push(prijava)
            prijava = new Prijava("Dario", "Strunjak", "Zgodni Čupić", "sudionik", "Najbolji kamp")
            prijave.push(prijava)            
            //let prijave = await Prijava.fetchActivePrijava();
            return JSON.stringify({
                prijave : prijave
            });
            
        } catch (err) {
            console.error(err);
            return JSON.stringify({error : "Korisnik nije organizator. Pristup odbijen."});
        }

    }


    async processApplication(req, res, next){
        let prijavaInfo = req.body;
        //let id = prijavaInfo.id_prijava;
        let status = prijavaInfo.status;
        let korisnickoIme = prijavaInfo.ime;
        let korisnickoPrezime = prijavaInfo.prezime;
        
        let korisnik = await Korisnik.fetchKorisnikByUsername(korisnickoIme);
        let kamp = await Korisnik.fetchKorisnikByUsername('KampMladenade');
        Prijava.changeStatusPrijava(id, status);

        //

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
            to: `${korisnik.ime} ${korisnik.prezime} ${korisnik.email}`, // list of receivers
            //to: email,
            subject: "Kamp Mlade nade - prijava", // Subject line
            text: "", // plain text body
        } 


        try {
            if(status == "prihvaćena"){
                msg.text = `Pozdrav ${korisnik.ime},\n
                Vaša prijava je ${status}!
                Vaše korisničko ime je ${korisnik.korisnicko_ime}. 
                Dovršite Vašu registraciju na poveznici.\n
                Vaš Kamp Mlade nade \n
                http://${req.hostname}:3000/register`;
                await transporter.sendMail(msg);
                
            } else if(status == "odbijena"){
                msg.text = `Pozdrav ${korisnik.ime}, \n 
                Vaša prijava je nažalost ${status}. 
                Pokušajte se prijaviti na sljedeći kamp. \n
                Vaš Kamp Mlade nade`;
                await transporter.sendMail(msg);

                korisnik.removeKorisnik();
            } else {
                throw new Error();
            }

            
        } catch (error) {
            return JSON.stringify({error : "Greška kod obrade prijave."});
        }


        return JSON.stringify({
            korisnickoIme : korisnickoIme,
            status_prijava : status
        });
    }
}

let prijava = new PrijavaController();

router.get("/", async (req, res, next) => {
    let data = JSON.parse( await prijava.activeApplications(req, res, next));
    if(data.error != null){
        res.status(400).json(data);
    } else {
        res.json(data);
    }
});

router.post("/", async (req, res, next) => {
    console.log(req.body)
    let data = JSON.parse( await prijava.processApplication(req, res, next));
    if(data.error != null){
        res.status(400).json(data);
    } else {
        res.json(data);
    }
});

module.exports = router;