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
        let cookies = cookie.parse(req.headers.cookie || '');
        let user = JSON.parse(cookies.user);
        let userName = user.userName;
    
        try {
            if(! await Organizator.checkOrganizator(userName)) throw new Error();

            // testno
            let prijave = {
                prva : "Prva prijava",
                druga : "Druga prijava",
                treca : "Jos jedna prijava"
            }
            //let prijave = await Prijava.fetchActive();
            return JSON.stringify({
                prijave : prijave
            });
            
        } catch (err) {
            console.error(err);
            return JSON.stringify({error : "Korisnik nije organizator. Pristup odbijen."});
        }

    }


    async processApplication(req, res, next){
        let applicationInfo = req.body;
        let id = applicationInfo.id_prijava;
        let status = applicationInfo.status_prijava;
        let userName = applicationInfo.userName;
        
        let korisnik = await Korisnik.fetchKorisnikByUsername(userName); 
        //Prijava.changeStatusPrijava(id, status);

        let email = 'nettie.hoppe32@ethereal.email'; 
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: email, // generated ethereal user
                pass: 'TJjEN9Q25yTgc4mRuM', // generated ethereal password
            },
        });
        
        let msg = {
            from: '"Kamp Mlade nade" <kamp@mladenade.com>', // sender address
            //to: `${korisnik.email}`, // list of receivers
            to: email,
            subject: "Kamp Mlade nade - prijava", // Subject line
            text: "", // plain text body
        }

        try {
            if(status == "prihvaćena"){
                msg.text = `Pozdrav ${korisnik.ime}, \n
                Vaša prijava je ${status}! 
                Vaše korisničko ime je ${korisnik.korisnicko_ime}. \n 
                Dovršite Vašu registraciju na poveznici.\n
                http://${req.hostname}:3000/register`;
                await transporter.sendMail(msg);
                
            } else if(status == "odbijena"){
                msg.text = `Pozdrav ${korisnik.ime}, \n Vaša prijava je nažalost ${status}. Pokušajte se prijaviti na sljedeći kamp.`;
                await transporter.sendMail(msg);
            } else {
                throw new Error();
            }

            
        } catch (error) {
            return JSON.stringify({error : "Greška kod obrade prijave."});
        }


        return JSON.stringify({
            userName : userName,
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
    let data = JSON.parse( await prijava.processApplication(req, res, next));
    if(data.error != null){
        res.status(400).json(data);
    } else {
        res.json(data);
    }
});

module.exports = router;